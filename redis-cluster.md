<!-- #redis #cluster -->

# Overview

Redis cluster calculates hash based on the key only.

# Client

```bash
# Follow redirects to other nodes.
redis-cli -c
```

# Nodes & slots

```bash
# Get slot for a given key.
CLUSTER KEYSLOT ${key}

# Get slot ranges.
CLUSTER SLOTS

# Get node information along with slot ranges.
CLUSTER NODES
```

# Commands with hashtags

```bash
MSET user:{0001}:name John
MSET user:{0001}:age 32

MGET user:{0001}:name
MGET user:{0001}:age
```

```bash
# Fails with "(error) CROSSSLOT Keys in request don't hash to the same slot"
MSET user:0001:name John user:0002:name Joe
MSET user:{0001}:name John user:{0002}:name Joe
```

# Cluster management ([doc](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/#add-a-new-node))

```sh
# Create a cluster
redis-cli --cluster create ${host:port} ${host:port}... --cluster-replicas 1

# Get cluster nodes
redis-cli CLUSTER NODES
redis-cli --cluster check ${node-id}

# Reshard all the slots to a different node
# After a reshard when a node has no slots, then it becomes a slave.
redis-cli --cluster reshard ${dst-node-id}

# Remove a node
redis-cli --cluster del-node ${node-id} ${node-to-remove-id}
```

# ioredis

Set environment variable `DEBUG=ioredis:*` to enable debug.
