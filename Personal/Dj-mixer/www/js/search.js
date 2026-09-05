// In-app YouTube search via the official YouTube Data API v3.
// Requires a (free) API key pasted into config.js -> CONFIG.YOUTUBE_API_KEY.
// Free daily quota is 10,000 units; each search call costs 100 units,
// so about 100 searches/day on the free tier - plenty for personal use.

async function searchYouTube(query) {
  if (!CONFIG.YOUTUBE_API_KEY) {
    throw new Error('No YouTube API key set. Add one in js/config.js to enable search.');
  }

  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet&type=video&maxResults=8` +
    `&q=${encodeURIComponent(query)}` +
    `&key=${CONFIG.YOUTUBE_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    let message = `Search failed (HTTP ${res.status}).`;
    try {
      const errBody = await res.json();
      if (errBody && errBody.error && errBody.error.message) {
        message = errBody.error.message;
      }
    } catch (_) {
      // ignore parse failure, keep default message
    }
    throw new Error(message);
  }

  const data = await res.json();
  return (data.items || []).map((item) => ({
    videoId: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.default.url,
  }));
}
