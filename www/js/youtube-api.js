// Loads the YouTube IFrame Player API script and exposes a simple
// "ready" hook so the rest of the app doesn't have to know about the
// global callback YouTube requires.

let _ytApiReady = false;
let _ytApiReadyCallbacks = [];

function onYouTubeIframeReady(callback) {
  if (_ytApiReady) {
    callback();
  } else {
    _ytApiReadyCallbacks.push(callback);
  }
}

// Required global callback name expected by the YouTube IFrame API.
window.onYouTubeIframeAPIReady = function () {
  _ytApiReady = true;
  _ytApiReadyCallbacks.forEach((cb) => cb());
  _ytApiReadyCallbacks = [];
};

(function loadYouTubeApiScript() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
})();
