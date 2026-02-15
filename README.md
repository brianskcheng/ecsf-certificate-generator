# ECSF Certificate Generator

A browser-based certificate generator built for the Exeter Chinese Student Fellowship. Fill in the details, see a live preview, and export to PDF -- no server or installation required.

**Version:** 1.2 | **Author:** Brian Cheng | **Released:** February 2026

## Features

- **Live preview** -- certificate updates in real time as you type
- **Customizable fields** -- recipient name, occasion, description, date, signatory, and certificate ID
- **Occasion presets** -- choose from common occasions or enter a custom one
- **Auto-generated certificate ID** -- unique ID created automatically, with manual override
- **Signature options** -- cursive text or freehand draw
- **PDF export** -- one-click download as a formatted A4 landscape PDF
- **Export validation** -- warns when required fields are missing, with option to export anyway
- **Loading screen** -- displays a spinner until all resources (fonts, scripts) are fully loaded
- **Collapsible sidebar** -- maximize preview space when needed
- **Responsive layout** -- mobile-friendly overlay menu for phones in portrait and landscape
- **Embed support** -- copy an iframe snippet from the About dialog to embed the generator on any site
- **About dialog** -- in-app info, GitHub link, and embed code
- **Toast notifications** -- non-intrusive feedback on actions like export and copy

## Usage

Open `index.html` in any modern browser. No build step or install required.

1. Enter the recipient's name and select an occasion (or create a custom one).
2. Optionally add a description, certificate ID, and signatory title.
3. Set the date and signatory name.
4. Choose a signature style -- cursive text or draw your own.
5. Click **Export PDF** to download the certificate.

### Embedding

To embed the generator on another site, open the About dialog (the **i** button) and click the copy icon next to the iframe code.

## Tech Stack

- Vanilla HTML, CSS, and JavaScript
- [html2canvas](https://html2canvas.hertzen.com/) -- renders the certificate to a canvas
- [jsPDF](https://github.com/parallax/jsPDF) -- generates the PDF from the canvas
- Google Fonts (Montserrat, Lora, Dancing Script)

## Project Structure

```
index.html      Main application page
styles.css      All styling and certificate layout
app.js          Application logic and interactivity
logo-data.js    Embedded ECSF logo data
```
