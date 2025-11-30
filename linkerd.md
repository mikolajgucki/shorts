<!-- #k8s #kubernetes #linkerd -->

# Installation ([doc](https://linkerd.io/2.18/getting-started/))

1. Install Gateway API

    This install CRDs (Custom Resource Definitions).

    ```bash
    kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.1/standard-install.yaml
    ```

2. Install credentials

    ```bash
    linkerd install --crds | kubectl apply -f -
    ```

3. Install control plane

   ```bash
   linkerd install | kubectl apply -f -
   ```

   It might require the option `--set proxyInit.runAsRoot=true`:

   ```bash
   linkerd --set proxyInit.runAsRoot=true --set policyController.additionalArgs="--allow-l5d-request-headers" install | kubectl apply -f -
   ```

   Install with values from a file:

   ```bash
   linkerd --values values.yaml install | kubectl apply -f -
   ```

    The file could be:

   ```yaml
   proxyInit:
     runAsRoot: true

   policyController:
     additionalArgs:
       - --allow-l5d-request-headers
   ```

4. Verify installation

    ```bash
    linkerd check
    ```

5. Uninstall

    ```bash
    linkerd uninstall | kubectl delete -f -
    ```


# viz installation ([doc](https://linkerd.io/2.18/getting-started/#step-6-explore-linkerd))

1. Install viz

    ```bash
    linkerd viz install | kubectl apply -f -
    ```

2. Verify installation

    ```bash
    linkerd check
    ```

3. Open the dashboard

    ```bash
    linkerd viz dashboard &
    ```

3. Uninstall

    ```bash
    linkerd viz uninstall | kubectl delete -f -
    ```

# Console tools

* Show top requests

    ```bash
    linkerd viz top deployment/${deployment} --namespace ${namespace}
    ```

# Mesh a deployment ([doc](https://linkerd.io/2.18/tasks/adding-your-service/))

```bash
cat deployment.yml | linkerd inject - | kubectl apply -f -
```

# Retries and timeouts ([doc](https://linkerd.io/2.18/features/retries-and-timeouts/), [reference](https://linkerd.io/2.18/reference/retries/))

- gRPC annotations
  - `retry.linkerd.io/grpc` one of:
    - `cancelled`
    - `deadline-exceeded`
    - `internal`
    - `resource-exhausted`
    - `unavailable`
  - `retry.linkerd.io/limit` maximum number of retries
  - `retry.linkerd.io/timeout` timeout after which a request is canceled and retried


# Links

- [Service profiles](https://linkerd.io/2.14/features/service-profiles/)