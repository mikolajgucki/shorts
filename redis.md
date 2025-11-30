<!-- #redis -->

# Docker

```sh
# Plain Redis
docker container run -d -p 6379:6379 --name redis redis:latest

# Redis + RedisSearch, RedisJSON and couple more
docker container run -d -p 6379:6379 --name redis redis/redis-stack:latest
```

# Commands

```sh
MODULE LIST
```

# Lists

```bash
# Push at the head of a list
LPUSH user:{0001}:cart product0001

# Push at the end of a list
RPUSH user:{0001}:cart product0001

# Get list length
LLEN user:{0001}:cart

# Set TTL (in seconds)
EXPIRE user:{0001}:cart 10 

# Get elements of a list
LRANGE user:{0001}:cart 0 -1
```

# Sets

```bash
# Add a member (value) to a set
SADD user:{0001}:history product0001
SADD user:{0001}:history product0002

# Gets the number of members (values)
SCARD user:{0001}:history

# Get all the members
SMEMBERS user:{0001}:history

# Removes a member
SREM user:{0001}:history product0002

# Return union, difference and intersection between sets
SUNION ${key}...
SDIFF ${key}...
SINTER ${key}...
```

# Sorted sets

```sh
# Add a member
ZADD ${key} ${score} ${member} [${score} ${member}...]
ZADD leaderboard 4560 John
ZADD leaderboard 3490 Joe
ZADD leaderboard 9080 Steve

# Get score of a member
ZSCORE leaderboard John

# Get rank of a member
ZRANK leaderboard John WITHSCORE

# Get the number of members
ZCARD leaderboard
```

# Hashes

```bash
# Set values in a hash
HSET user:0001 name john
HSET user:0001 email john@example.com

# Get values
HGET user:0001 email

# Get all values
HGETALL user:0001

# Get keys
HKEYS user:0001

# Get number of fields
HLEN user:0001

# Set TTL on fields
HEXPIRE user:0001 60 FIELDS 1 email

# Get TTL of fields
HPTTL user:0001 FIELDS 1 email
```

# Indexes ([doc](https://redis.io/docs/latest/develop/interact/search-and-query/advanced-concepts/vectors/))

A prefix or prefixes can specified during index creation. The prefix is the prefix of the key of hash which is used to store and read index records. For example if the index prefix is `vindex:`, then:

```sh
# Store a record with fields name and email with identifier johndoe
HSET vindex:johndoe name John email join@example.com

# Gets all the fields of a record of identifier johndoe
HGETALL vindex:johndoe
```

```sh
# List indexes
FT._LIST

# Get info about an index
FT.INFO ${index}

# Delete index with keys
FT.DROPINDEX ${index} DD
```

## Example

```sh
# Create index
FT.CREATE tindex ON HASH PREFIX 1 tindex: SCHEMA id TAG value TEXT

# Add data
HSET tindex:1 id 1 value one
HSET tindex:2 id 2 value two
HSET tindex:3 id 3 value three
HSET tindex:4 id 4 value four
HSET tindex:5 id 5 value five

# Search
FT.SEARCH tindex (@id:3)
```

# Publish/subscribe

```sh
# Subscribe/unsubscribe to a channel
SUBSCRIBE ${channel}...
UNSUBSCRIBE ${channel}...

# Subscribe/unsubscribe to a channel by pattern
# ? replaces a single character
# * replaces any number of characters
SUBSCRIBE ${pattern}...
UNSUBSCRIBE ${pattern}...

# Publish
PUBLISH ${channel} ${message}

# List active channels
PUBSUB CHANNELS
```

# Streams

- [Redis Streams](https://redis.io/docs/latest/develop/data-types/streams/)