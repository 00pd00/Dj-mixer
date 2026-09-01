// Entry point: creates both decks once the YouTube IFrame API is ready,
// then wires up all UI controls.

let deckA, deckB;

onYouTubeIframeReady(async () => {
  deckA = new Deck('A', 'player-A');
  deckB = new Deck('B', 'player-B');

  await Promise.all([deckA.init(), deckB.init()]);

  wireDeckControls(deckA, {
    input: 'input-A',
    load: 'load-A',
    playpause: 'playpause-A',
    volume: 'volume-A',
    disc: 'disc-A',
  });

  wireDeckControls(deckB, {
    input: 'input-B',
    load: 'load-B',
    playpause: 'playpause-B',
    volume: 'volume-B',
    disc: 'disc-B',
  });

  wireCrossfader(deckA, deckB);

  console.log('DJ Mixer ready: two independent decks online.');
});
