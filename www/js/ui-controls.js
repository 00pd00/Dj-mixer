// Wires DOM controls (buttons, sliders, text inputs) to a Deck instance.

function wireDeckControls(deck, ids) {
  const input = document.getElementById(ids.input);
  const loadBtn = document.getElementById(ids.load);
  const playBtn = document.getElementById(ids.playpause);
  const volumeSlider = document.getElementById(ids.volume);
  const disc = document.getElementById(ids.disc);

  loadBtn.addEventListener('click', () => {
    const ok = deck.loadTrack(input.value);
    if (ok) playBtn.textContent = 'Play';
  });

  playBtn.addEventListener('click', () => {
    deck.togglePlay();
  });

  volumeSlider.addEventListener('input', (e) => {
    deck.setVolume(Number(e.target.value));
  });

  deck.onStateChange = (isPlaying) => {
    disc.classList.toggle('spinning', isPlaying);
    playBtn.textContent = isPlaying ? 'Pause' : 'Play';
  };
}

function wireCrossfader(deckA, deckB) {
  const crossfader = document.getElementById('crossfader');
  const volA = document.getElementById('volume-A');
  const volB = document.getElementById('volume-B');

  crossfader.addEventListener('input', (e) => {
    const position = Number(e.target.value); // 0 (full A) - 100 (full B)
    const volumeA = Math.round(100 - position);
    const volumeB = Math.round(position);

    deckA.setVolume(volumeA);
    deckB.setVolume(volumeB);

    // Keep individual sliders in sync so the UI never lies about state.
    volA.value = volumeA;
    volB.value = volumeB;
  });
}
