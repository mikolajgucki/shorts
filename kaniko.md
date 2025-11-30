<!-- #kaniko #docker -->

# Links

- [kaniko](https://github.com/GoogleContainerTools/kaniko)

# Kaniko

```bash
docker run \
    -v "$HOME"/.config/gcloud:/root/.config/gcloud \
    -v /path/to/context:/workspace \
    gcr.io/kaniko-project/executor:latest \
    --dockerfile /workspace/Dockerfile \
    --destination "gcr.io/$PROJECT_ID/$IMAGE_NAME:$TAG" \
    --context dir:///workspace/
```

```bash
docker run -v /home/flip
```