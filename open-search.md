<!-- #opensearch -->

# Docker

```sh
docker container run -d -p 9200:9200 -p 9600:9600 -e "discovery.type=single-node" -e "OPENSEARCH_INITIAL_ADMIN_PASSWORD=SrY&8Jp56#Q5" --name opensearch opensearchproject/opensearch:3

```

# Test installations

```sh
curl -v -u 'admin:SrY&8Jp56#Q5' -k 'https://localhost:9200/'
```

# Links

- [NodeJS User guide](https://github.com/opensearch-project/opensearch-js/blob/HEAD/USER_GUIDE.md)
