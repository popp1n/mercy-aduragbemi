# Romantic Birthday Website — HTML, CSS & JavaScript

This is a simple static version of the birthday website. It works without React, Next.js, Tailwind, or a build process.

## Files

- `index.html` — page layout and gallery image placeholders
- `style.css` — colours, responsive layout, animation, dark mode, lightbox styles
- `script.js` — names, love date, reasons, timeline, music setting, and interactive features

## Open it locally

Double-click `index.html`, or right-click it and open it in your browser.

For the most reliable local testing, use a tiny local server such as VS Code's **Live Server** extension.

## Personalize it

Open `script.js` and update:

```js
const BIRTHDAY_PERSON_NAME = "My Beautiful";
const YOUR_NAME = "Your Name";
const LOVE_START_DATE = "2024-02-14T19:30:00";
const MUSIC_FILE = "";
```

You can also update the timeline, reasons, and surprise message in the same file.

## Add your own photos

In `index.html`, replace the `src="..."` and `data-image="..."` image URLs in the gallery with your own image file paths, for example:

```html
<img src="images/our-first-date.jpg" alt="Us on our first date" />
```

Put your images into an `images` folder beside `index.html`.

## Add music

Put an MP3 in a folder called `music`, for example:

```
music/our-song.mp3
```

Then in `script.js`, set:

```js
const MUSIC_FILE = "music/our-song.mp3";
```

Most browsers will not autoplay music with sound until someone taps the music button. That is a browser rule, not a problem with the website.

## Upload to a website host

Upload all three files together, along with any `images` and `music` folders, to the main folder of your web host.
