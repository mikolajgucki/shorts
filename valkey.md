<!-- #redis #valkey -->

# Docker

```sh
# Run plain Valkey
docker run --name valkey -p 6379:6379 -d valkey/valkey

# Run Valkey with extensions (Valkey JSON, Bloom and Search)
docker run --name valkey -p 6379:6379 -d valkey/valkey-extension
```

# Basics

- Command `valkey-server`
- Configuration file (?) `/usr/local/etc/valkey/valkey.conf`
