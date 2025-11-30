# RaspberryPi

## `systemd` services

* Service control
  ```sh
  sudo systemctl start|stop|status [service]
  ```

* Service logs
  ```sh
  sudo journalctl -u [service].service
  ```

* List services
  ```sh
  systemctl list-units --type=service
  ```

* Reload services
  ```sh
  systemctl daemon-reload
  ```

### Service to start a server on boot

The following service was installed on a Raspberry Pi running Ubuntu 20.04.

```
[Unit]
Description=Mealz
After=network-online.target
Wants=network-online.target

[Service]
User=mealz
WorkingDirectory=/home/mealz/mealz
PIDFile=/home/mealz/mealz/.pid
ExecStart=/home/mealz/mealz/bin/start.sh
ExecStop=/home/mealz/mealz/bin/stop.sh

[Install]
WantedBy=multi-user.target
```

## Network

```sh
sudo netstat -tulpn | grep LISTEN
```

## Directories

* Ubuntu: `/usr/lib/systemd/system`
* Raspberry OS: `?`

### SSH reverse tunnel

The following service was installed on a Raspberry Pi running Ubuntu 20.04.
The service opens port `8443` on the remote host `172.105.250.165` and forwards the local port `4040` to the remote `8443`. The remote host must be accessible through an SSL key (`/home/ubuntu/.ssh/id_rsa`).

```
[Unit]
Description=Reverse SSH tunnel opening port 8443 on 172.105.250.165 and redirecting it to 127.0.0.1:4040
After=network.target
User=ubuntu
Group=ubuntu

[Service]
ExecStart=/usr/bin/ssh -i /home/ubuntu/.ssh/id_rsa -NT -o ServerAliveInterval=60 -o ExitOnForwardFailure=yes -R 0.0.0.0:8443:127.0.0.1:4040 root@172.105.250.165

# Restart every >2 seconds to avoid StartLimitInterval failure
RestartSec=5
Restart=always

[Install]
WantedBy=multi-user.target
```
