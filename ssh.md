<!-- ssh -->

# SSH

```sh
# Setup reverse tunnel
ssh -N -R ${bind_address}:${remote_port}:localhost:${local_port} ${user@remote_host}

# Setup reverse tunnel to expose a port not automatically
# exposed by the host port (when `GatewayPorts` is not set to `yes`)
ssh -N -R :${remote_port}:localhost:${local_port} ${user@remote_host}
```

# Passphrase

```sh
# Remember passphrase on macos
ssh-add --apple-use-keychain ~/.ssh/id_rsa
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```