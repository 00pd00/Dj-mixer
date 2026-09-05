# DJ Mixer

Two independent YouTube "decks" mixed together via Android's audio output.
Each deck has its own play/pause, volume fader, thumbnail/title display,
seekable progress bar, and error reporting. A crossfader (with animated
fade buttons) blends both volumes together.

## Features

**Core**
- Paste a YouTube link/ID, or search in-app, into either deck
- Independent play/pause and volume per deck
- Crossfader + one-tap "Fade to A" / "Fade to B" animated transitions
- Disc art shows the real video thumbnail; spins while playing
- Track title + channel name shown per deck (via YouTube oEmbed, free, no key)
- Seekable progress bar with elapsed/total time
- Friendly error messages (e.g. "Embedding disabled by the video owner")
  instead of silent failures
- Session auto-save/restore: reopen the app and your last two tracks +
  volume levels come back automatically
- Keyboard shortcuts (see legend in-app) and best-effort Web MIDI
  controller support

## Setup

```bash
npm install
npx cap add android
npx cap sync
npx cap open android
```

Run on a real device for reliable dual-audio playback testing.

### Enabling in-app search (optional)
Search requires a free YouTube Data API v3 key:
1. Go to https://console.cloud.google.com/apis/credentials
2. Create a project (or use an existing one) and enable "YouTube Data API v3"
3. Create an API key
4. Paste it into `www/js/config.js` -> `CONFIG.YOUTUBE_API_KEY`
5. Run `npx cap sync` again and rebuild

Free tier: 10,000 units/day, ~100 searches/day (100 units each) - plenty
for personal use. Without a key, search shows a friendly error but the
rest of the app (manual link paste, playback, mixing) works fine.

## Known limitations (by design)
- Both YouTube players must remain visibly on screen per YouTube's API
  Terms of Service - they can't be fully hidden (see the small
  `player-visible` boxes under each disc).
- No EQ or audio effects - only volume-level control is possible since
  raw audio samples aren't exposed by the IFrame API.
- First playback on each deck needs a real user tap (autoplay policy).
- Ads may play on either video independently; that's YouTube's call.
- Web MIDI support is best-effort: many Android system WebViews (the
  one Capacitor uses) don't implement it, so a physical MIDI controller
  may not be detected on your device even though the code supports it.
  Keyboard shortcuts work regardless (useful with a Bluetooth keyboard).
- MIDI CC-to-control mapping (`controller-input.js`) uses placeholder
  numbers (1, 2, 3) - change them to match your actual hardware.

## Project structure
```
dj-mixer-app/
├── www/
│   ├── index.html
│   ├── css/style.css
│   └── js/
│       ├── config.js          # constants + API key
│       ├── youtube-api.js     # loads YT IFrame API
│       ├── metadata.js        # thumbnail + title fetch (oEmbed)
│       ├── search.js          # YouTube Data API search
│       ├── session.js         # localStorage save/restore
│       ├── controller-input.js# keyboard + MIDI support
│       ├── deck.js            # Deck class (player, volume, seek, errors)
│       ├── ui-controls.js     # wires DOM controls to Decks
│       └── app.js             # bootstraps everything
├── capacitor.config.json
├── package.json
└── .gitignore
```

## Next ideas
- Auto-level matching between decks
- Save multiple named presets, not just the single last session
- Physical MIDI CC mapping UI (map buttons instead of hardcoded numbers)
