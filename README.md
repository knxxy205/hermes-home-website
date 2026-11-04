# Hermes Home website

Static landing page for the Hermes Home Android app.

## Preview locally

Serve this directory with any static HTTP server, for example:

```sh
python3 -m http.server 4173
```

## Deploy

Pushing to `main` runs the GitHub Pages workflow in `.github/workflows/deploy.yml`.
The site uses plain HTML, CSS, and JavaScript; GSAP, ScrollTrigger, Lenis, and
web fonts load from their public CDNs.
