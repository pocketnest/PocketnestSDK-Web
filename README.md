
# PocketnestSDK-Web

[![Latest Release](https://img.shields.io/github/v/release/pocketnest/PocketnestSDK-Web?sort=semver)](https://github.com/pocketnest/PocketnestSDK-Web/releases)

Web SDK for Pocketnest — a **minimal, framework‑agnostic** helper that either:
- **Embeds** your Pocketnest flow in a page via an `<iframe>` (fills its parent container), or
- **Opens** your Pocketnest flow in a **new browser tab**.


---

## Installation

### Option A — npm (recommended)
```bash
npm install pocketnest-sdk-web
# or
yarn add pocketnest-sdk-web


Import and use:
```js
// ESM
import PocketnestSDKWeb from "pocketnest-sdk-web"; // if using default export style from bundler
// or
import { iFrame, open } from "pocketnest-sdk-web"; // if your bundler supports named exports
```

## Usage

To get url and accessToken you need to check ##Pocketnest SSO Partner Procedures### documentation.

### 1) Embed as iframe (fills its parent container)
Create a container with your desired size, then append the iframe.

```html
<div id="pocketnest-container" style="width:100%; max-width:960px; height:600px; border:1px solid #eee; border-radius:12px; overflow:hidden;"></div>

<script type="module">
  import { iFrame } from "pocketnest-sdk-web";

  const url = "https://pocketnest-preprod.netlify.app"; // your hosted Pocketnest URL
  const accessToken = "your-user-session-token"; // used for automatic login user (session)
  const container = document.getElementById("pocketnest-container");

  const frame = iFrame({ url, accessToken });
  container.appendChild(frame);
</script>
```

You can also pass extra iframe attributes if needed:
```js
const frame = iFrame({
  url: "https://pocketnest-preprod.netlify.app", // your hosted Pocketnest URL
  accessToken: "your-user-session-token", // used for automatic login user (session)
  attributes: {
    allow: "clipboard-write; fullscreen",
    sandbox: "allow-scripts allow-forms allow-popups allow-same-origin"
  }
});
```

### 2) Open in a new tab
```js
import { open } from "pocketnest-sdk-web";
//url and accessToken
open("https://pocketnest-preprod.netlify.app", "your-user-session-token");
```

---

## API

### `iFrame(options | url: string): HTMLIFrameElement`
Creates and returns an `<iframe>` with:
- `width: 100%`
- `height: 100%`
- `border: 0`
- `loading="eager"`
- `referrerpolicy="no-referrer"`

**Parameters**
- `options.url` (string, required): URL to load.
- `options.accessToken` (string, optional): User session token.
- `options.attributes` (object, optional): Extra attributes to set on the iframe element.

> You must append the returned iframe to your desired container.

### `open(url: string): void`
Opens the URL in a new browser tab using `window.open(url, "_blank", "noopener,noreferrer")`.

---

## Example
A ready-to-run example is in `examples/basic`. Open `examples/basic/index.html` in your browser or serve it with any static server.

<img width="1133" height="923" alt="Screenshot 2025-09-23 at 15 47 15" src="https://github.com/user-attachments/assets/7bc0e1da-c7b9-436f-943d-e980afe08090" />

---

