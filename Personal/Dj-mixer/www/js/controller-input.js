// Keyboard shortcuts + optional Web MIDI controller support.
//
// Keyboard (works whenever no text/range input is focused):
//   1 / 2        toggle play-pause on Deck A / Deck B
//   [ / ]        decrease / increase Deck A volume
//   , / .        decrease / increase Deck B volume
//   ArrowLeft/Right  move the crossfader
//
// MIDI: best-effort only. Many Android system WebViews (including the
// one Capacitor uses) do not implement the Web MIDI API, so this will
// silently no-op on unsupported devices. CC numbers below are a
// placeholder mapping - change them to match your actual controller.

function syncVolumeSlider(deckName, value) {
  const el = document.getElementById(`volume-${deckName}`);
  if (el) el.value = value;
}

function setupKeyboardControls(deckA, deckB, crossfaderEl) {
  document.addEventListener('keydown', (e) => {
    const active = document.activeElement;
    if (active && ['INPUT', 'TEXTAREA'].includes(active.tagName)) return;

    switch (e.key) {
      case '1':
        deckA.togglePlay();
        break;
      case '2':
        deckB.togglePlay();
        break;
      case '[':
        deckA.setVolume(Math.max(0, deckA.volume - 5));
        syncVolumeSlider('A', deckA.volume);
        break;
      case ']':
        deckA.setVolume(Math.min(100, deckA.volume + 5));
        syncVolumeSlider('A', deckA.volume);
        break;
      case ',':
        deckB.setVolume(Math.max(0, deckB.volume - 5));
        syncVolumeSlider('B', deckB.volume);
        break;
      case '.':
        deckB.setVolume(Math.min(100, deckB.volume + 5));
        syncVolumeSlider('B', deckB.volume);
        break;
      case 'ArrowLeft':
        crossfaderEl.value = Math.max(0, Number(crossfaderEl.value) - 5);
        crossfaderEl.dispatchEvent(new Event('input'));
        break;
      case 'ArrowRight':
        crossfaderEl.value = Math.min(100, Number(crossfaderEl.value) + 5);
        crossfaderEl.dispatchEvent(new Event('input'));
        break;
      default:
        break;
    }
  });
}

function setupMidiControls(deckA, deckB, crossfaderEl) {
  if (!navigator.requestMIDIAccess) {
    console.log('Web MIDI API not supported here - skipping controller support.');
    return;
  }

  navigator
    .requestMIDIAccess()
    .then((midiAccess) => {
      const inputs = Array.from(midiAccess.inputs.values());
      inputs.forEach((input) => {
        input.onmidimessage = (msg) => handleMidiMessage(msg, deckA, deckB, crossfaderEl);
      });
      console.log(`MIDI ready: ${inputs.length} controller(s) connected.`);
    })
    .catch((err) => console.warn('MIDI access denied or unavailable:', err));
}

// Placeholder mapping - adjust controller numbers (1, 2, 3) to match
// your actual hardware's MIDI CC assignments.
function handleMidiMessage(message, deckA, deckB, crossfaderEl) {
  const [status, controller, value] = message.data;
  const isControlChange = (status & 0xf0) === 0xb0;
  if (!isControlChange) return;

  const scaled = Math.round((value / 127) * 100);

  if (controller === 1) {
    deckA.setVolume(scaled);
    syncVolumeSlider('A', scaled);
  } else if (controller === 2) {
    deckB.setVolume(scaled);
    syncVolumeSlider('B', scaled);
  } else if (controller === 3) {
    crossfaderEl.value = scaled;
    crossfaderEl.dispatchEvent(new Event('input'));
  }
}
