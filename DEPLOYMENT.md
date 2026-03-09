# Deployment Guide

The VotePeace Frontend is a static application built with Vite. It can be deployed to any static site hosting service (Vercel, Netlify, S3, Nginx).

## Build Command

Run the following command to generate the production build:

```bash
npm run build
```

This will create a `dist/` (or `build/`) folder containing your optimized HTML, CSS, and JS files.

## Deploying to Vercel (Recommended)

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Framework Preset: Select **Vite**.
4.  Build Command: `npm run build`
5.  Output Directory: `dist`
6.  **Environment Variables**: Add `VITE_API_BASE_URL` pointing to your production backend.

## Deploying to Nginx

1.  Build the project locally or in CI.
2.  Copy the contents of `dist/` to your Nginx root (e.g., `/var/www/html`).
3.  Configure Nginx to handle Client-Side Routing (SPA fallback):

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Docker Deployment

Dockerfile example for serving with Nginx:

```dockerfile
# Stage 1: Build
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
