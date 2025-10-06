# TreeDirect

Branching Tree website @sillylittle.tech and Redirect tool @kiya.party

## Features

### 🌱 Grow - Link Tree Website (`/grow/`)
A customizable link tree website with:
- Clean, modern design
- Light/dark mode toggle (similar to kiya.cat)
- Responsive layout for mobile and desktop
- Easy to customize links and profile information

### ✨ Magic - URL Redirects (`/magic/`)
Short URL redirect system using Cloudflare Pages format:
- Simple redirect management via `_redirects` file
- Example redirects included (GH → GitHub, BS → Bluesky)
- Easy to add new short links

## Setup

### For Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Set build settings to:
   - Build command: (none needed)
   - Build output directory: `/`
3. Deploy!

The `_redirects` file in `/magic/` will automatically be processed by Cloudflare Pages.

### Customization

#### Grow (Link Tree)
Edit `/grow/index.html` to customize:
- Profile name and bio
- Avatar/profile picture
- Links and their destinations

#### Magic (Redirects)
Edit `/magic/_redirects` to add new redirects:
```
/magic/CODE https://destination-url.com 301
```

Format: `source destination [status_code]`
- 301 = permanent redirect
- 302 = temporary redirect (default)

## Local Development

Simply open `index.html` in your browser to navigate between sections.

For the link tree with theme toggle, open `/grow/index.html` directly.

## License

BSD 3-Clause License - See LICENSE file for details.
