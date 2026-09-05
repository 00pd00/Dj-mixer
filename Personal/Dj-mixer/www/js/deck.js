// Deck: wraps a single YT.Player instance and its playback state.
// Two of these (Deck A, Deck B) are created independently, giving
// each one its own player, volume, and current track.

const YT_ERROR_MESSAGES = {
  2: 'Invalid video ID.',
  5: 'Playback error (HTML5).',
  100: 'Video not found or removed.',
  101: 'Embedding disabled by the video owner.',
  150: 'Embedding disabled by the video owner.',
};

class Deck {
  constructor(name, containerId) {
    this.name = name;
    this.containerId = containerId;
    this.player = null;
    this.currentVideoId = null;
    this.volume = CONFIG.DEFAULT_VOLUME;

    // Callbacks set by ui-controls.js
    this.onStateChange = function () {};
    this.onError = function () {};
    this.onTrackLoaded = function () {}; // (videoId) => {}
  }

  init() {
    return new Promise((resolve) => {
      this.player = new YT.Player(this.containerId, {
        height: String(CONFIG.PLAYER_HEIGHT),
        width: String(CONFIG.PLAYER_WIDTH),
        videoId: '',
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            this.player.setVolume(this.volume);
            resolve(this);
          },
          onStateChange: (event) => this._handleStateChange(event),
          onError: (err) => this._handleError(err),
        },
      });
    });
  }

  _handleStateChange(event) {
    this.onStateChange(event.data === YT.PlayerState.PLAYING, event.data);
  }

  _handleError(err) {
    const message = YT_ERROR_MESSAGES[err.data] || 'Unknown playback error.';
    console.error(`Deck ${this.name} error (${err.data}):`, message);
    this.onError(message);
  }

  // Accepts a full YouTube URL (watch, youtu.be, shorts, embed) or a
  // bare 11-character video ID.
  static extractVideoId(input) {
    if (!input) return null;
    const trimmed = input.trim();

    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  // For manual paste-a-link/ID input
  loadTrack(inputValue) {
    const videoId = Deck.extractVideoId(inputValue);
    if (!videoId) {
      this.onError("Couldn't recognize that YouTube link/ID.");
      return false;
    }
    this.loadById(videoId);
    return true;
  }

  // For search results / session restore, where we already have a clean ID
  loadById(videoId) {
    this.currentVideoId = videoId;
    this.player.cueVideoById(videoId);
    this.onTrackLoaded(videoId);
  }

  play() {
    if (this.player && this.currentVideoId) this.player.playVideo();
  }

  pause() {
    if (this.player) this.player.pauseVideo();
  }

  togglePlay() {
    if (!this.player || !this.currentVideoId) return;
    const state = this.player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(value) {
    this.volume = value;
    if (this.player && this.player.setVolume) {
      this.player.setVolume(value);
    }
  }

  getCurrentTime() {
    return this.player && this.player.getCurrentTime ? this.player.getCurrentTime() : 0;
  }

  getDuration() {
    return this.player && this.player.getDuration ? this.player.getDuration() : 0;
  }

  seekTo(seconds) {
    if (this.player && this.player.seekTo) this.player.seekTo(seconds, true);
  }
}
