# Run from the Docker image

```sh
docker container run --name nginx -d nginx
docker container run --name openresty/openresty:1.21.4.1-0-alpine -d nginx-lb
```

# Configuration files

The configuration file `nginx.conf` can be in one of the following directories:
- `/usr/local/nginx/conf`
- `/etc/nginx`
- `/usr/local/etc/nginx`

# Basic commands

```sh
# Fast shutdown
nginx -s stop

# Graceful shutdown
nginx -s quit

# Reload the configuration
nginx -s reload

# Reopen the log files
nginx -s reopen
```

# Links

- [nginx Lua API](https://openresty-reference.readthedocs.io/en/latest/Lua_Nginx_API/)
- [Load balancing using Lua](https://medium.com/@nbenliogludev/building-basic-load-balancer-with-dynamic-backends-with-nginx-lua-da5d3cc77b52)

# OpenResty

OpenResty sits in the directory `/usr/local/openresty` with the configuration in `/usr/local/openresty/nginx/conf`.

- [Lua balancer](https://github.com/openresty/lua-resty-core/blob/master/lib/ngx/balancer.md)