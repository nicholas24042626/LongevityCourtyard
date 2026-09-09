# Longevity Courtyard

A static, responsive website recreated from **Longevity Courtyard Website.fig.zip**. The desktop pages use the archive's component coordinates, linked styles, typography, image crops, original photographs, vector artwork, and videos. Mobile layouts reflow the desktop design into readable sections and cards.

## Preview

The running development preview is at **http://localhost:4173**.

To start it again from PowerShell:

```powershell
.\Start-Website.ps1
```

With Node.js installed, `npm start` also works. No package installation is needed. Alternatively, open `index.html` directly in a browser. Stop the local server with Ctrl+C.

## Pages and interactions

- Homepage with the original **For Seniors / For Anyone** variants.
- Programmes, fitness team, holistic movement team, stories, equipment/resources, visit, and about pages.
- Six equipment selector states from the original components.
- Native video playback, phone and map links, and the design's WhatsApp booking destination.
- Mobile navigation, keyboard focus states, skip link, and dismissible information dialogs.

## Editing

`src/pages.json` and `src/equipment.json` contain the extracted page and component layouts, text, and asset references. `scripts/build.cjs` generates the root HTML pages. `styles.css` contains responsive behavior; `app.js` contains interactions. Assets and fonts are stored locally under `assets/`.

```powershell
npm run build
npm test
```

The included Node runtime can also run these scripts: `.\.tools\node.exe scripts/build.cjs` and `.\.tools\node.exe scripts/check.cjs`.

## Design fidelity and unfinished source content

The supplied archive includes alternate designs and an unpublished About frame. The site uses the prototype's selected homepage plus the other named page frames; the About frame is available from the homepage's About link. Original draft copy, including team placeholders, is retained.

The archive does not supply a complete Chinese translation, legal policy text, or an official Facebook URL. These controls open explanatory dialogs with contact options; no policy or translation is presented as approved. Trial buttons open the original WhatsApp destination rather than claiming to create a booking.

Desktop positions and source assets are reproduced directly. Browser font rendering, gradient interpolation, video controls, and the added mobile layouts can differ from Figma's rendering. No pixel-perfect certification is implied.

## Validation

The static check verifies all page links and local asset references. Browser validation covers all nine pages at 1440px and 390px, image loading, horizontal overflow, navigation, menus, dialogs, and video range requests. Review screenshots are saved locally in `test-results/` (excluded from version control).

Serve the root HTML files, `styles.css`, `app.js`, and `assets/` on any static host. Keep `.tools/`, `design/`, and `test-results/` private. Deployment is not configured.
