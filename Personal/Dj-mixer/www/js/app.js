// Entry point: creates both decks once the YouTube IFrame API is ready,
// wires up all UI controls, and restores the last saved session.

let deckA, deckB, crossfaderEl;

function persistSession() {
  saveSession({
    A: { videoId: deckA.currentVideoId, volume: deckA.volume },
    B: { videoId: deckB.currentVideoId, volume: deckB.volume },
    crossfader: Number(document.getElementById('crossfader').value),
  });
}

function restoreSession() {
  const state = loadSession();
  if (!state) return;

  if (state.A && state.A.videoId) {
    deckA.loadById(state.A.videoId);
    deckA.setVolume(typeof state.A.volume === 'number' ? state.A.volume : CONFIG.DEFAULT_VOLUME);
    document.getElementById('volume-A').value = deckA.volume;
  }

  if (state.B && state.B.videoId) {
    deckB.loadById(state.B.videoId);
    deckB.setVolume(typeof state.B.volume === 'number' ? state.B.volume : CONFIG.DEFAULT_VOLUME);
    document.getElementById('volume-B').value = deckB.volume;
  }

  if (typeof state.crossfader === 'number') {
    document.getElementById('crossfader').value = state.crossfader;
  }
}

onYouTubeIframeReady(async () => {
  deckA = new Deck('A', 'player-A');
  deckB = new Deck('B', 'player-B');

  await Promise.all([deckA.init(), deckB.init()]);

  wireDeckControls(
    deckA,
    {
      input: 'input-A',
      load: 'load-A',
      playpause: 'playpause-A',
      volume: 'volume-A',
      disc: 'disc-A',
      status: 'status-A',
      progress: 'progress-A',
      time: 'time-A',
    },
    persistSession
  );

  wireDeckControls(
    deckB,
    {
      input: 'input-B',
      load: 'load-B',
      playpause: 'playpause-B',
      volume: 'volume-B',
      disc: 'disc-B',
      status: 'status-B',
      progress: 'progress-B',
      time: 'time-B',
    },
    persistSession
  );

  crossfaderEl = wireCrossfader(deckA, deckB, persistSession);
  wireFadeButtons(crossfaderEl, persistSession);
  wireSearch(deckA, deckB, persistSession);

  setupKeyboardControls(deckA, deckB, crossfaderEl);
  setupMidiControls(deckA, deckB, crossfaderEl);

  restoreSession();

  console.log('DJ Mixer ready: two independent decks online, upgrades loaded.');
});
