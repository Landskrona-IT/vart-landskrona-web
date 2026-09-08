# Vårt Landskrona - Web form

This repository contains a webpage with a pre-designed form that is intended to be embedded into the [Vårt Landskrona](https://github.com/Landskrona-IT/vart-landskrona-app) app's WebView component.


## Local development

### Live reload (Docker)

Run the development service:

```bash
docker compose -f docker-compose.dev.yml up --watch --build
```

Visit http://localhost:8080. Docker Compose Watch syncs CSS, HTML, and JavaScript
changes into the container; Webpack detects them by polling and reloads the page.

Stop it with `Ctrl-C`. To remove the development container and its dependencies:

```bash
docker compose -f docker-compose.dev.yml down
```

### Production-like image

Build & run the Docker Image:
```bash
docker build -t vart-landskrona-web .
docker run --rm -p 8080:80 vart-landskrona-web
```
Visit localhost:8080



## License
Distributed under the [MIT License](LICENSE).
