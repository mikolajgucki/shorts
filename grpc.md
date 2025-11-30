<!-- #grpc -->

# Package `@grpc/grpc-js`

Environment variable for debug:

```sh
GRPC_VERBOSITY=debug GRPC_TRACE=dns_resolver,round_robin
```

Available traces (taken from the `@grpc/grpc-js` source):
- `backoff`
- `certificate_provider`
- `proxy`
- `outlier_detection`
- `pick_first`
- `round_robin`
- `load_balancing_call`
- `dns_resolver`
- `ip_resolver`
- `resolving_call`
- `resolving_load_balancer`
- `retrying_call`
- `server_call`
- `server`
- `subchannel_call`
- `subchannel`
- `transport`
- `transport_flowctrl`

# Client-side load balancing

## Local (IP resolver)

Set target to `ipv4:${host}:${port},${host}:${port}...`.

## Kubernetes (DNS resolver)

Set the ClusterIP headless service as the target when creating a client.

```typescript
const target = 'hello-world.hello-world-namespace.svc.cluster.local:50051';
const client = new helloWorldProto['Greeter'](
  target,
  grpc.credentials.createInsecure(),
);
```

`@grpc/grpc-js` should log the following with `GRPC_VERBOSITY=debug GRPC_TRACE=dns_resolver`:
```log
2025-05-09 04:55:38.785Z D 2025-05-09T04:55:38.785Z | v1.13.3 1 | dns_resolver | Looking up DNS hostname hello-world.hello-world-namespace.svc.cluster.local
2025-05-09 04:55:38.794Z D 2025-05-09T04:55:38.793Z | v1.13.3 1 | dns_resolver | Resolved addresses for target dns:hello-world.hello-world-namespace.svc.cluster.local:50051: [10.244.1.160:50051,10.244.1.157:50051,10.244.1.159:50051]
```