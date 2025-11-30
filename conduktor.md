<!-- #conduktor -->

# Run in Docker

```sh
curl -L https://releases.conduktor.io/quick-start -o docker-compose.yml && docker compose up
```

# Advanced filter

```js
let isShop = (value.event_metadata.server.sources || []).some(s => s.source_type === 'shop');
return value.event_metadata.server.recommendation_service_name == null && !isShop;
```
