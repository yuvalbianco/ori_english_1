# Ori – English Words Game (No Spelling Needed)

This is a small browser game to practice *using* the vocabulary words in sentences.

## How to run (easiest)
1. Unzip the folder
2. Double-click `index.html`

If your browser blocks local files, run a tiny local server:

### macOS / Linux
```bash
cd ori_vocab_game
python3 -m http.server 8000
```
Then open: http://localhost:8000

### Windows (PowerShell)
```powershell
cd ori_vocab_game
py -m http.server 8000
```

## Modes
- **Fill the Gap**: choose the correct word for a sentence with a blank
- **Choose the Correct Sentence**: pick the sentence that uses the word correctly

## Progress
Progress is saved automatically in the browser (`localStorage`).
You can export/import progress as JSON (useful if she switches computers).

## Hosting options (so she can use it anywhere)
- **GitHub Pages** (free): push the folder to a repo and enable Pages
- **Netlify** (free): drag-and-drop the folder in Netlify “Deploy manually”
- **Vercel** (free): similar to Netlify

No backend is required.
