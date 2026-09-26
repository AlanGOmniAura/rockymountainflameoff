# Google Cloud Platform (GCP) Deployment & Architecture Notes

**Project:** Rocky Mountain Flame Off Website  
**Date:** September 2026  
**Status:** Live in Production  

---

## 1. Core Service Configuration

| Attribute | Production Value |
|---|---|
| **GCP Project ID** | `wizard-shop` |
| **GCP Region** | `us-west1` (The Dalles, Oregon) |
| **Cloud Run Service** | `rockymountainflameoff` |
| **Active Production Revision** | `rockymountainflameoff-00032-2vf` |
| **Traffic Allocation** | 100% routed to active revision |
| **Ingress Setting** | Allow all traffic (`--allow-unauthenticated`) |
| **Container Port** | `8080` |
| **Primary Domain** | [https://rockymountainflameoff.com/](https://rockymountainflameoff.com/) |
| **Cloud Run Direct URL** | [https://rockymountainflameoff-101864478350.us-west1.run.app](https://rockymountainflameoff-101864478350.us-west1.run.app) |

---

## 2. Container & Serving Architecture

The application is containerized using a high-efficiency multi-stage Docker build:

### Stage 1: Build Environment (`node:20-alpine`)
- Working directory `/app`.
- Copies `package.json` and `package-lock.json`.
- Runs `npm ci` for deterministic, clean package installation.
- Copies all application source code, assets, and data files.
- Executes `npm run build` using Vite to generate optimized static output in `dist/`.

### Stage 2: Runtime Environment (`nginx:alpine`)
- Replaces default Nginx configuration with custom [`nginx.conf`](./nginx.conf).
- Copies compiled assets from Stage 1 `dist/` to `/usr/share/nginx/html`.
- Listens on port `8080` (as required by Google Cloud Run).
- Single Page Application (SPA) routing: Handles client-side URL routing and deep links (such as `/?entry=entry-1`) using:
  ```nginx
  location / {
      try_files $uri $uri/ /index.html;
  }
  ```
- Implements Gzip compression for JavaScript, CSS, JSON, and SVG assets.
- Sets Cache-Control headers for immutable hashed assets (`/assets/`) with 1-year max-age.

---

## 3. Google Cloud Build & Deployment Workflow

### Deployment Command
```powershell
$env:CLOUDSDK_METRICS_ENVIRONMENT = "datacloud.antigravity"
gcloud run deploy rockymountainflameoff `
  --source . `
  --region=us-west1 `
  --project=wizard-shop `
  --allow-unauthenticated
```

### Packaging & `.gcloudignore` Rules
Because the repository includes high-resolution artist photos, competition entry photos, and slideshow images in `public/` (~380 MB compressed), configuring `.gcloudignore` correctly was critical:
- **Root-only wildcards**: Used leading slashes (e.g., `/*.png`, `/*.jpg`, `/*.mjs`) to avoid recursively ignoring image files in `public/competition_photos/`, `public/artist_photos/`, and `public/opt_slideshow/`.
- **Exclusions**:
  - `node_modules/`
  - `dist/`
  - `archive_raw_assets/` (uncompressed raw assets)
  - `chrome_temp*/` (temporary browser debugging caches)
  - `*.log` and local test scripts

---

## 4. Multi-Tenant Project Isolation Guardrails

The GCP project `wizard-shop` hosts multiple client applications. The deployment strictly targets `rockymountainflameoff` and never modifies or redeploys other services:
- **`rockymountainflameoff-staging`**: Staging instance for Rocky Mountain Flame Off (isolated).
- **`glass-class-denver-staging`**: Glass Class Denver application (untouched).
- **`buildapipe-staging`**: Build A Pipe application (untouched).

---

## 5. Domain & SSL Infrastructure

- Custom domain `rockymountainflameoff.com` is routed via Cloud Run Domain Mappings / Cloud Load Balancing.
- SSL certificates are automatically provisioned, validated, and managed by Google Managed SSL Certificates with automatic renewal.
- HTTP traffic is automatically upgraded to HTTPS.
