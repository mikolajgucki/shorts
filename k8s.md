<!-- #k8s -->

# Links

- [k8s spec](https://kubespec.dev)

# Logs

```bash
reset;kubectl --context prod logs -f --tail=50 -n ${namespace} ${pod}
```

# Port forward

```bash
kubectl port-forward --namespace ${namespace} pod/${pod} 3000:3000 --context prod
```

# Upload

```bash
kubectl cp /tmp/foo ${namespace}/${pod}:/tmp/bar
```

# Configure k8s to pull images from a local Docker registry ([doc](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry))

1. Login to Docker

```bash
docker login localhost:5000
```

2. Docker will print out where it stored `.config` file. Pass the path to the file to Kubernetes when copying credentials to Kubernetes.

```bash
# kubectl create secret generic ${name} --from-file=.dockerconfigjson=${docker-config-json} --type=kubernetes.io/dockerconfigjson
kubectl create secret generic local-registry --from-file=.dockerconfigjson=~/.docker/config.json --type=kubernetes.io/dockerconfigjson
kubectl get secrets
```

## Example pod configuration to pull from a local registry

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: ${name}
spec:
  containers:
  - name: ${name}
    image: ${registry-host}:5000/${name}:latest
    imagePullPolicy: Always
    ports:
    - containerPort: 3000
      protocol: TCP
  imagePullSecrets:
  - name: ${local-registry}
```

# Services

## Headless service

A headless service provides DNS entries for all the matching pods.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ${name}
  namespace: ${namespace}
spec:
  type: ClusterIP
  clusterIP: None # <-- This is important!
  selector:
    app: ${pod-label}
  ports:
  - protocol: TCP
    name: http
    port: 8080
    targetPort: 8080
```

# [Metrics server](https://github.com/kubernetes-sigs/metrics-server)

In order to change metrics resolution (update frequency):
- Go to the metrics server deployment (namespace `kube-system`).
- Change the argument `--metric-resolution=60s`

# Service

The service is URL is `<service-name>.<namespace>.svc.cluster.local:<service-port>`.