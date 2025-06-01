---
title: "Bare Metal Go Deployment"
description: "Deploy Go apps to Linux servers the old-school way."
date: "Jun 1 2025"
draft: false
tags:
  - Golang
  - DevOps
---

A hands-on guide to deploying Go apps without Docker, CI/CD, or cloud automation. Build binaries, transfer over SSH, set up systemd, configure NGINX, and generate SSL, all manually, on a real server. Full control. Zero abstraction.

### Set Up the Server and Configure `systemd`

SSH into your VPS server, create the necessary directory for your app.

```bash
mkdir /var/lib/goapp
```

And then configure a systemd service to manage it. Navigate to `/etc/systemd/system` and create a new service file named `goapp.service`

```bash
[Unit]
Description=goapp

[Service]
Type=simple
Restart=always
RestartSec=5s
ExecStart=/var/lib/goapp/latest
WorkingDirectory=/var/lib/goapp

[Install]
WantedBy=multi-user.target
```

### Creating Golang App

Build a simple Go application that handles an HTTP server.

```go
package main

import "net/http"

func main() {
	mux := http.NewServeMux()
	mux.Handle("GET /", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello World"))
	}))

	http.ListenAndServe(":8080", mux)
}

```

### Build the App

Compile the Go app into a uniquely named binary using a timestamp. Assume your VPS server is running Linux on `amd64` architecture.

```bash
GOOS=linux GOARCH=amd64 go build -o binary-$(date +%s) main.go
```

The output binary will be named like `binary-1685612345`, where the number is the current Unix timestamp.

### Send the Binary to the Server

Transfer the compiled binary from your local machine to the VPS server using `scp`. Assuming your VPS server's IP is `123.123.123.123`.

```bash
scp binary-1685612345 root@123.123.123.123:/var/lib/goapp
```

### Manage Binary Versions with a Symlink

Once the new binary is on your VPS server at `/var/lib/goapp/`, create or update a symbolic link called latest that points to the current binary version. This lets your systemd service always run the latest binary without changing the service file every time.

```bash
ln -sfn /var/lib/goapp/binary-1685612345 /var/lib/goapp/latest
```

Finally, restart the `goapp` service to pick up the new binary:

```bash
sudo systemctl restart goapp.service
```

Your app is now accessible at `http://123.123.123.123:8080`.

### Configure NGINX with Domain and SSL Certificates

Get a free SSL certificate from [gethttpsforfree](http://gethttpsforfree.com/). Follow their steps to generate your domain private key (domain.key) and Signed Certificate Chain (chained.pem).

Move the private key to the server’s app directory

```bash
mv domain.key /var/lib/goapp
```

Create the file directly on your VPS and paste the contents of the `chained.pem` certificate from your browser output and save the file

```bash
nano /var/lib/goapp/chained.pem
```

Install NGINX on your VPS server if you haven't already

```bash
sudo apt update
sudo apt install nginx
```

Create a new NGINX site configuration file at `/etc/nginx/sites-available/goapp`. Assuming your domain is goapp.com

```bash
server {
	listen 80;
	server_name goapp.com;
	return 301 https://$host$request_uri;
}

server {
	listen 443 ssl;
	server_name goapp.com;

	ssl_certificate /var/lib/goapp/chained.pem;
	ssl_certificate_key /var/lib/goapp/domain.key;

	location / {
		proxy_pass http://localhost:8080;
		proxy_set_header Host $host;
		proxy_set_header X-Real-Ip $remote_addr;
	}
}
```

Enable the site and reload NGINX

```bash
sudo ln -s /etc/nginx/sites-available/goapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Your app is now accessible at `https://goapp.com`.

### Secure Your Server with UFW (Firewall)

Right now, your server is exposed, all ports are open by default. We'll use UFW to lock it down and allow only essential traffic: SSH and HTTP/HTTPS.
First, install UFW

```bash
sudo apt update
sudo apt install ufw
```

Then allow only the necessary services

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
```

Now enable the firewall

```bash
sudo ufw enable
```

### Deployment with Makefile

To streamline future deployments, you can create a `Makefile` script. This avoids repeating manual build, upload, and symlink steps every time.

```makefile
.PHONY: deploy
deploy:
	REMOTE=root@123.123.123.123 && \
	DEPLOY_PATH=/var/lib/goapp && \
	TIMESTAMP=$$(date +%s) && \
	BINARY=binary-$$TIMESTAMP && \
	GOOS=linux GOARCH=amd64 go build -o $$BINARY main.go && \
	scp $$BINARY $$REMOTE:$$DEPLOY_PATH/ && \
	ssh $$REMOTE 'ln -sfn '$$DEPLOY_PATH'/'$$BINARY' '$$DEPLOY_PATH'/latest && systemctl restart goapp' && \
	rm $$BINARY
```
