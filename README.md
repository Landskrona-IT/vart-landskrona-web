# Vårt Landskrona - Web form

This repository contains a webpage with a pre-designed form that is intended to be embedded into the [Vårt Landskrona](https://github.com/Landskrona-IT/vart-landskrona-app) app's WebView component.


## Local development

### Live reload (Docker)

Run the development service:

```bash
npm run dev
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

## Deploy to Scaleway Serverless Containers

The production image is hosted in the private Scaleway Container Registry
namespace `landskrona-containers` in the `pl-waw` region, then deployed to a
Scaleway Serverless Container.

### One-time setup

Install the [Scaleway CLI](https://github.com/scaleway/scaleway-cli). Before
deploying, obtain a Scaleway IAM API key for a principal with access to the
Landskrona project.

Create a named CLI profile (replace `landskrona` with any name you prefer).
The interactive setup asks for the access key, secret key, project ID, and
default region/zone; select `pl-waw` and `pl-waw-1` when prompted:

```bash
scw --profile landskrona init
```

### Build, push, and deploy

Build the Webpack bundle before building the image. The `Dockerfile` serves the
already-built `dist/app.js` with nginx. Each production build includes a unique
release ID, shown discreetly at the bottom-right when the page is opened in the
mobile app; include it in screenshots when reporting an issue.

```bash
npm install
npm run build

scw --profile landskrona registry login region=pl-waw

IMAGE_TAG="$(git rev-parse --short HEAD)"
IMAGE="rg.pl-waw.scw.cloud/landskrona-containers/vart-landskrona-web:${IMAGE_TAG}"

docker buildx build \
  --platform linux/amd64 \
  --tag "$IMAGE" \
  --push .
```

Deploy the immutable image tag. List the container first if its ID is not
known:

```bash
scw --profile landskrona container container list \
  region=pl-waw name=vart-landskrona-web
```

```bash
scw --profile landskrona container container update <CONTAINER_ID> \
  image="$IMAGE" \
  port=80 \
  region=pl-waw \
  --wait
```

`--wait` completes when the new revision is ready. Use the container endpoint
shown in the Scaleway Console to verify the deployment.



## License
Distributed under the [MIT License](LICENSE).
