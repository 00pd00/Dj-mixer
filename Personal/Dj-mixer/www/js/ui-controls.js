// Wires DOM controls (buttons, sliders, text inputs) to Deck instances,
// plus the newer features: thumbnails/titles, progress/seek, fade
// transitions, and search results.

function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

function setDeckThumbnail(deckName, videoId) {
  const disc = document.getElementById(`disc-${deckName}`);
  disc.style.backgroundImage = `url(${thumbnailUrlFor(videoId)})`;
  disc.style.backgroundSize = 'cover';
  disc.style.backgroundPosition = 'center';
}

async function setDeckTitle(deckName, videoId) {
  const titleEl = document.getElementById(`title-${deckName}`);
  titleEl.textContent = 'Loading info...';
  const meta = await fetchVideoMetadata(videoId);
  titleEl.textContent = meta.author ? `${meta.title} - ${meta.author}` : meta.title;
}

function wireDeckControls(deck, ids, onChange) {
  const input = document.getElementById(ids.input);
  const loadBtn = document.getElementById(ids.load);
  const playBtn = document.getElementById(ids.playpause);
  const volumeSlider = document.getElementById(ids.volume);
  const disc = document.getElementById(ids.disc);
  const statusEl = document.getElementById(ids.status);
  const progressEl = document.getElementById(ids.progress);
  const timeEl = document.getElementById(ids.time);

  let isSeeking = false;

  loadBtn.addEventListener('click', () => {
    statusEl.textContent = '';
    const ok = deck.loadTrack(input.value);
    if (ok) playBtn.textContent = 'Play';
  });

  playBtn.addEventListener('click', () => deck.togglePlay());

  volumeSlider.addEventListener('input', (e) => {
    deck.setVolume(Number(e.target.value));
    onChange();
  });

  progressEl.addEventListener('pointerdown', () => {
    isSeeking = true;
  });
  progressEl.addEventListener('pointerup', () => {
    isSeeking = false;
  });
  progressEl.addEventListener('input', (e) => {
    const duration = deck.getDuration();
    if (duration > 0) {
      deck.seekTo((Number(e.target.value) / 100) * duration);
    }
  });

  deck.onStateChange = (isPlaying) => {
    disc.classList.toggle('spinning', isPlaying);
    playBtn.textContent = isPlaying ? 'Pause' : 'Play';
  };

  deck.onError = (message) => {
    statusEl.textContent = message;
  };

  deck.onTrackLoaded = (videoId) => {
    statusEl.textContent = '';
    setDeckThumbnail(deck.name, videoId);
    setDeckTitle(deck.name, videoId);
    onChange();
  };

  // Poll playback position every 500ms (paused while user is dragging)
  setInterval(() => {
    if (isSeeking) return;
    const duration = deck.getDuration();
    const current = deck.getCurrentTime();
    if (duration > 0) {
      progressEl.value = Math.round((current / duration) * 100);
      timeEl.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    }
  }, 500);
}

function wireCrossfader(deckA, deckB, onChange) {
  const crossfader = document.getElementById('crossfader');
  const volA = document.getElementById('volume-A');
  const volB = document.getElementById('volume-B');

  crossfader.addEventListener('input', (e) => {
    const position = Number(e.target.value); // 0 = full A, 100 = full B
    const volumeA = Math.round(100 - position);
    const volumeB = Math.round(position);

    deckA.setVolume(volumeA);
    deckB.setVolume(volumeB);
    volA.value = volumeA;
    volB.value = volumeB;
    onChange();
  });

  return crossfader;
}

function animateCrossfadeTo(targetPosition, crossfaderEl, durationMs, onChange) {
  const startPosition = Number(crossfaderEl.value);
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / durationMs);
    crossfaderEl.value = startPosition + (targetPosition - startPosition) * t;
    crossfaderEl.dispatchEvent(new Event('input'));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  if (onChange) onChange();
}

function wireFadeButtons(crossfaderEl, onChange) {
  document.getElementById('fade-to-A').addEventListener('click', () => {
    animateCrossfadeTo(0, crossfaderEl, 4000, onChange);
  });
  document.getElementById('fade-to-B').addEventListener('click', () => {
    animateCrossfadeTo(100, crossfaderEl, 4000, onChange);
  });
}

function wireSearch(deckA, deckB, onTrackChosen) {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-button');
  const resultsEl = document.getElementById('search-results');

  async function runSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    resultsEl.innerHTML = '<div class="search-status">Searching...</div>';
    try {
      const results = await searchYouTube(query);
      renderResults(results);
    } catch (e) {
      resultsEl.innerHTML = `<div class="search-status error">${e.message}</div>`;
    }
  }

  function renderResults(results) {
    resultsEl.innerHTML = '';
    if (results.length === 0) {
      resultsEl.innerHTML = '<div class="search-status">No results.</div>';
      return;
    }
    results.forEach((r) => {
      const item = document.createElement('div');
      item.className = 'search-result';

      const img = document.createElement('img');
      img.src = r.thumbnail;
      img.alt = '';

      const text = document.createElement('div');
      text.className = 'search-result-text';
      text.innerHTML = `${r.title}<br><small>${r.channel}</small>`;

      const buttons = document.createElement('div');
      buttons.className = 'search-result-buttons';

      const btnA = document.createElement('button');
      btnA.textContent = 'A';
      btnA.addEventListener('click', () => {
        deckA.loadById(r.videoId);
        onTrackChosen();
      });

      const btnB = document.createElement('button');
      btnB.textContent = 'B';
      btnB.addEventListener('click', () => {
        deckB.loadById(r.videoId);
        onTrackChosen();
      });

      buttons.appendChild(btnA);
      buttons.appendChild(btnB);

      item.appendChild(img);
      item.appendChild(text);
      item.appendChild(buttons);
      resultsEl.appendChild(item);
    });
  }

  searchBtn.addEventListener('click', runSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') runSearch();
  });
}
