<!-- #docker #registry -->

# Links

- [Set up local registry](https://www.docker.com/blog/how-to-use-your-own-registry-2/)
- [Registry HTTP API](https://docker-docs.uclv.cu/registry/spec/api/)

# Set up local registry

```bash
docker run -d -p 5000:5000 --name ${name} registry:2.7
```

# Registry API

```bash
curl -X GET http://localhost:5000/v2/_catalog
curl -X GET -u <user>:<pass> http://localhost:5000/v2/_catalog
curl -X GET http://localhost:5000/v2/${image}/tags/list
```

# Push to a local registry

```bash
docker tag ${image} localhost:5000/${image}
docker push localhost:5000/${image}
```