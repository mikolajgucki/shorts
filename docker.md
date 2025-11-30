<!-- #docker -->

# Run container 

```sh
# Run container (as a daemon) with a port exposed
docker container run --name ${name} -p ${host-port}:${container-port} -d ${image}

# Run a container with file sharing (as a daemon)
docker run --name ${name} -v ${/host/path}:${/container/path} -d ${image}
```

# Remove all dangling (none) images

```sh
docker rmi $(docker images --filter dangling=true -q)
```

# Get IP address of a container

```sh
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${container}
```

# Copy a file between the host and a container

```sh
docker container cp ${local-file} ${container}:${container-file}
docker container cp ${container}:${container-file} ${local-file}
```

# Build from Dockerfile and keep the output

```sh
docker build -t ${name:tag} -D --progress=plain .
```

# Shared network

```sh
docker create network shared-net
```

```yml
services:
  app-server:
    image: ${image}
    command: ${image}
    networks:
      - shared-net

networks:
  shared-net:
    external: true
```

```yml
services:
  app-client:
    image: ${image}
    command: ${command}
    networks:
      - shared-net

networks:
  shared-net:
    external: true
```

Now, the service `app-client` can reach the server by `app-server`.