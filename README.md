
# PocketnestSDK-Web

![PocketnestSDK-Web](https://img.shields.io/badge/PocketnestSDK--Web-1.0.-success)

Web SDK for Pocketnest — a **minimal, framework‑agnostic** helper that either:
- **Embeds** your Pocketnest flow in a page via an `<iframe>` (fills its parent container), or
- **Opens** your Pocketnest flow in a **new browser tab**.


---

## Installation

### Option A — npm (recommended)
```bash
npm install @pocketnest/sdk-web
# or
yarn add @pocketnest/sdk-web


Import and use:
```js
// ESM
import PocketnestSDKWeb from "@pocketnest/sdk-web"; // if using default export style from bundler
// or
import { iFrame, open } from "@pocketnest/sdk-web"; // if your bundler supports named exports
```

## Usage

### 1) Embed as iframe (fills its parent container)
Create a container with your desired size, then append the iframe.

```html
<div id="pocketnest-container" style="width:100%; max-width:960px; height:600px; border:1px solid #eee; border-radius:12px; overflow:hidden;"></div>

<script type="module">
  import { iFrame } from "@pocketnest/sdk-web";

  const url = "https://pocketnest-preprod.netlify.app"; // your hosted Pocketnest URL
  const container = document.getElementById("pocketnest-container");

  const frame = iFrame({ url });
  container.appendChild(frame);
</script>
```

You can also pass extra iframe attributes if needed:
```js
const frame = iFrame({
  url: "https://pocketnest-preprod.netlify.app",
  attributes: {
    allow: "clipboard-write; fullscreen",
    sandbox: "allow-scripts allow-forms allow-popups allow-same-origin"
  }
});
```

### 2) Open in a new tab
```js
import { open } from "@pocketnest/sdk-web";
open("https://pocketnest-preprod.netlify.app");
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
- `options.attributes` (object, optional): Extra attributes to set on the iframe element.

> You must append the returned iframe to your desired container.

### `open(url: string): void`
Opens the URL in a new browser tab using `window.open(url, "_blank", "noopener,noreferrer")`.

---

## Example
A ready-to-run example is in `examples/basic`. Open `examples/basic/index.html` in your browser or serve it with any static server.

---

## Version
**1.0.0**

---

