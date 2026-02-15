# ECSF Certificate Generator

A browser-based certificate generator built for the Exeter Chinese Student Fellowship. Fill in the details, see a live preview, and export to PDF -- no server or installation required.

## Features

- **Live preview** -- certificate updates in real time as you type
- **Customizable fields** -- recipient name, occasion, description, date, signatory, and certificate ID
- **Signature options** -- cursive text or freehand draw
- **PDF export** -- one-click download as a formatted A4 landscape PDF
- **Collapsible sidebar** -- maximize preview space when needed
- **Responsive layout** -- adapts to smaller screens

## Usage

Open `index.html` in any modern browser. No build step or install required.

1. Enter the recipient's name and select an occasion (or create a custom one).
2. Optionally add a description, date, certificate ID, and signatory details.
3. Choose a signature style -- cursive text or draw your own.
4. Click **Export PDF** to download the certificate.

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
