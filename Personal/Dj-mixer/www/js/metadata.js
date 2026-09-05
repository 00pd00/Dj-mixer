// Free, no-API-key helpers for showing thumbnail + title info per deck.
// Uses YouTube's public oEmbed endpoint for title/author, and the
// predictable static thumbnail URL pattern for the disc art.

function thumbnailUrlFor(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

async function fetchVideoMetadata(videoId) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (!res.ok) throw new Error('oEmbed request failed');
    const data = await res.json();
    return { title: data.title || 'Unknown title', author: data.author_name || '' };
  } catch (e) {
    console.warn('Could not fetch video metadata:', e);
    return { title: 'Unknown title', author: '' };
  }
}
