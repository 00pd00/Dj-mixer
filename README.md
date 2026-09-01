# DJ Mixer (MVP)

Two independent YouTube "decks" mixed together via Android's audio output.
Each deck has its own play/pause, volume fader, and a spinning disc that
reacts to playback state. A crossfader ties both volumes to one slider.

## What works right now (Phase 1 MVP)
- Paste a YouTube link (or bare video ID) into either deck and hit Load.
- Play/Pause each deck independently.
- Independent volume sliders per deck (0-100).
- A crossfader that blends both volumes from one control.
- Disc art spins while its deck is playing.

## Setup

```bash
npm install
npx cap add android
npx cap sync
npx cap open android
```

This opens the project in Android Studio. Run it on a real device
(not just an emulator) for reliable dual-audio playback.

## Known limitations (by design, see project chat history)
- Both YouTube players must remain visibly on screen per YouTube's
  API Terms of Service (see the small `player-visible` boxes under
  each disc) - they can't be fully hidden.
- No EQ or audio effects - only volume-level control is possible
  since raw audio samples aren't exposed by the IFrame API.
- First playback on each deck needs a real user tap (autoplay policy).
- Ads may play on either video independently; that's YouTube's call,
  not something the app controls.

## Next phases
- V2: in-app search via YouTube Data API instead of pasting links.
- V3: save/restore last session (tracks + volume levels), better
  disc artwork pulled from each video's thumbnail.
- V4: progress bar/scrubbing, UI polish, optional MIDI controller
  support.
