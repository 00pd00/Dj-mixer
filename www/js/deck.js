// Deck: wraps a single YT.Player instance and its playback state.
// Two of these (Deck A, Deck B) are created independently, giving
// each one its own player, volume, and current track.

class Deck {
  constructor(name, containerId) {
    this.name = name;
    this.containerId = containerId;
    this.player = null;
    this.currentVideoId = null;
    this.volume = CONFIG.DEFAULT_VOLUME;
    this.onStateChange = function () {}; // set by ui-controls.js
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
          onError: (err) => console.error(`Deck ${this.name} error:`, err.data),
        },
      });
    });
  }

  _handleStateChange(event) {
    const isPlaying = event.data === YT.PlayerState.PLAYING;
    this.onStateChange(isPlaying, event.data);
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

  loadTrack(inputValue) {
    const videoId = Deck.extractVideoId(inputValue);
    if (!videoId) {
      alert(`Deck ${this.name}: couldn't recognize that YouTube link/ID.`);
      return false;
    }
    this.currentVideoId = videoId;
    this.player.cueVideoById(videoId);
    return true;
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
}
