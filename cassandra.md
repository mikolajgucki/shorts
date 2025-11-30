<!-- #cassandra #scylla -->

# Links

- [ScyllaDB glossary](https://opensource.docs.scylladb.com/stable/reference/glossary.html)
- [ScyllaDB cqlsh](https://opensource.docs.scylladb.com/stable/cql/cqlsh.html)
- [ScyllaDB consistency](https://opensource.docs.scylladb.com/stable/cql/consistency.html)
- [ScyllaDB compaction strategies](https://opensource.docs.scylladb.com/stable/architecture/compaction/compaction-strategies.html)
- [Cassandra compaction](https://docs.datastax.com/en/cassandra-oss/3.0/cassandra/dml/dmlHowDataMaintain.html)
- [How is data read?](https://docs.datastax.com/en/cassandra-oss/3.x/cassandra/dml/dmlAboutReads.html)

- [SSTables : The secret sauce that behind Cassandra’s write performance..](https://medium.com/@vinciabhinav7/cassandra-internals-sstables-the-secret-sauce-that-makes-cassandra-super-fast-3d5badac8eaf)
- [Cassandra SSTables Overview](https://anant.us/blog/modern-business/cassandra-sstables-overview/)

# Run ScyllaDB as a Docker image

```sh
docker container run -d -p 9042:9042 --name scylla scylladb/scylla
```

# Connect + basics

```bash
./cqlsh -u cassandra -p cassandra
```

```sql
DESCRIBE tables;
DESCRIBE keyspaces;
USE ${keyspace};
```

# Data model

- __Primary key__ = one or more partition keys + zero or more clustering keys
- __Partition key__ determines the partition and cluster node in which a row is stored. Each node contains a range of partitions.
- __Clustering key__ determines the order in which rows are stored. The rows within a node are sorted by the clustering key.
- Consistent hashing

# Table information

```sql
-- Get table information
SELECT *
FROM system_schema.tables
WHERE keyspace_name=${keyspace}
AND table_name=${tablename};
```

`system_schema.tables` provides the following columns:
- **keyspace_name**
- **table_name**
- bloom_filter_fp_chance
- caching
  - keys
    - ALL
    - NONE
  - rows_per_partition
    - NONE
    - number of rows cached
- comment
- compaction
- compression
- crc_check_chance
- dclocal_read_repair_chance
- default_time_to_live
- extensions
- flags
- gc_grace_seconds (period of time during which tombstones are not deleted)
- id
- max_index_interval
- memtable_flush_period_in_ms
- min_index_interval
- read_repair_chance
- speculative_retry

## Get read-to-write ratio

```sh
# Get read/write count using nodetool
nodetool cfstats ${keyspace} ${table}
```

# Row deletion

- A tombstone represents a deleted row ([tombstones](https://cassandra.apache.org/doc/latest/cassandra/managing/operating/compaction/tombstones.html)).
- A tombstone has an expiration period (grace period) after which it's deleted during the compaction process.
- A zombie is a row which was deleted, but recovered to all the other replicas from a replica that was unavailable when the row was being deleted.
  - The grace period prevents re-appearance of zombies.

# Compaction

```sh
nodetool compactionstats
nodetool compactionhistory

# Run compation
nodetool compact ${keyspace} ${table}
```

Compaction allows to set compaction throughput (`compaction_throughput_mb_per_sec` in the configuration). Auto-throttling can be enabled.

# Data

## Create keyspace & table ([keyspace](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_reference/cqlCreateKeyspace.html), [table](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_reference/cqlCreateTable.html))

```sql
-- Create keyspace
CREATE KEYSPACE votes
  WITH REPLICATION = {
    'class' : 'SimpleStrategy',
    'replication_factor' : 1
  };

-- Re-create table
DROP TABLE votes;
CREATE TABLE IF NOT EXISTS votes (
  userId varchar,
  postId varchar,
  vote tinyint,
  votedAt timestamp,
  PRIMARY KEY (userId, postId)
)
WITH CLUSTERING ORDER BY (postId DESC);
```

```sql
INSERT INTO votes.votes(userId,postId,vote,votedAt) VALUES('user000','post000',1,'2025-05-16 00:00:00');
```

## Copy data between tables and CSV files ([doc](https://docs.datastax.com/en/cql-oss/3.3/cql/cql_reference/cqlshCopy.html))

```sql
-- Copy data from a CSV file to a table
COPY ${keyspace}.${table} FROM '${file}.csv'
  WITH DELIMITER=','
  AND HEADER=TRUE
  AND NUMPROCESSES=${workers-count};

-- Copy data from a table to a CSV file
COPY ${keyspace}.${table} TO '${file}.csv' WITH DELIMITER=',' AND HEADER=TRUE;
```

## Table and SSTables (Sorted String Table) information

```sh
# List tables information
nodetool tablestats ${keyspace}.${table}

# List SSTables
nodetool sstableinfo ${keyspace} ${table}...
```

The SSTables are stored in the directories:
- `/var/lib/cassandra/data/${keyspace}`
- `/var/lib/scylla/data/${keyspace}`

# `nodetool`

```sh
# Get info on nodes in the cluster (-T to see tokens)
nodetool info
nodetool info -T
```

# Bloom filter

Bloom filter exists to determine if a key exists in given SSTable.

```sql
-- Change Bloom filter
ALTER TABLE ${keyspace}.${table} WITH bloom_filter_fp_chance = ${value};
```

- [Python Bloom filter implementation](https://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/)

# Configuration

The configuration files:
- `/etc/scylla/scylla.yaml`

```yaml
# Maximum number of distinct clustering key restrictions per query (maximum
# number of values in the IN statement)
max_clustering_key_restrictions_per_query: 250
```