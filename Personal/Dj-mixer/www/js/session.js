// Persists the last-used tracks, volumes, and crossfader position to
// localStorage so the app can resume where you left off.

const SESSION_KEY = 'dj_mixer_session_v1';

function saveSession(state) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save session:', e);
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Could not load session:', e);
    return null;
  }
}
