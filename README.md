Happy Birthday Site

Files created in this folder:

- index.html — main page
- css/style.css — styles
- js/main.js — card rendering and scroll animations

How to open:

Open `index.html` in a browser (mobile or desktop). For local testing on mobile, you can:

- Serve with a simple static server (recommended) e.g. `npx http-server` or `python -m http.server` in this folder.
- Or open the file directly in the browser (some features like local module loading may require a server in some browsers).

What it does:

- Full-screen scroll-snap sections.
- Cards reveal with animation using IntersectionObserver.
- Flirty medical lines appear on each scroll.
- Last card triggers a small confetti effect on tap/click.

Photos:
- The hero (first scroll) uses `HBD/photos/double.jpeg` as its background.
- Each card uses one image from `HBD/photos` in order: `p2.jpeg`, `p3.jpeg`, `p4.jpeg`, `p5.jpeg` (one photo per scroll).

Next steps you might want:

- Replace placeholder lines with personalised messages.
- Add images or a custom background.
 - Edit `js/main.js` to change which photos are used or their order.
- Hook up a name input to personalise messages dynamically.
