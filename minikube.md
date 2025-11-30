<!-- #k8s #minikube -->

# Start & stop

```sh
minikube start
minikube stop
minikube status
minikube delete

# Start with insecure Docker registry
minikube start --insecure-registry="${registry-host}:5000"
```

# Profile (cluster)

```sh
# List profiles
minikube profile list

# Select profile (cluster)
minikube profile ${profile}
```

# Shell

```sh
minikube ssh
```

# Metrics server

- [Kubernetes Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
- [FAQ](https://github.com/kubernetes-sigs/metrics-server/blob/master/FAQ.md)

```sh
# Install
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Enable
minikube addons enable metrics-server
```