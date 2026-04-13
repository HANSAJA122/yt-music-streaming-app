import axios from 'axios';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

const client = axios.create({ baseURL: env.youtubeApiBase });

/** Real key required — placeholder text is treated as unset */
const isYoutubeKeyConfigured = () => {
  const k = (env.youtubeApiKey || '').trim();
  if (!k) return false;
  if (/paste_your|paste your|your_real|example|placeholder/i.test(k)) return false;
  return true;
};

async function youtubeGet(path, params = {}) {
  if (!isYoutubeKeyConfigured()) {
    throw new AppError(
      'YouTube API key is missing or still a placeholder. Set YOUTUBE_API_KEY in .env and enable YouTube Data API v3 in Google Cloud.',
      503
    );
  }

  try {
    const { data } = await client.get(path, { params: { ...params, key: env.youtubeApiKey } });
    return data;
  } catch (err) {
    const status = err.response?.status;
    const ytMsg = err.response?.data?.error?.message || err.message;
    if (status === 400 || status === 403) {
      throw new AppError(
        `YouTube rejected the request (${status}): ${ytMsg}. Verify YOUTUBE_API_KEY and API restrictions.`,
        502
      );
    }
    throw new AppError(`YouTube request failed: ${ytMsg}`, 502);
  }
}

const parseISODuration = (isoDuration = 'PT0S') => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = Number(match?.[1] || 0);
  const minutes = Number(match?.[2] || 0);
  const seconds = Number(match?.[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const fetchVideoDurations = async (videoIds = []) => {
  if (!videoIds.length) return {};

  const data = await youtubeGet('/videos', {
    part: 'contentDetails',
    id: videoIds.join(',')
  });

  return (data.items || []).reduce((acc, item) => {
    acc[item.id] = parseISODuration(item.contentDetails?.duration);
    return acc;
  }, {});
};

const normalizeItems = async (items = []) => {
  const videoIds = items
    .map((item) => item.id?.videoId || item.id)
    .filter(Boolean);

  const durationMap = await fetchVideoDurations(videoIds);

  return items.map((item) => {
    const videoId = item.id?.videoId || item.id;
    const snippet = item.snippet || {};
    return {
      videoId,
      title: snippet.title || 'Unknown title',
      channelTitle: snippet.channelTitle || 'Unknown artist',
      thumbnail:
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        snippet.thumbnails?.default?.url ||
        '',
      publishedAt: snippet.publishedAt,
      duration: durationMap[videoId] || '0:00'
    };
  });
};

export const searchYouTube = async ({ query, filter = 'song', pageToken = '' }) => {
  const type = filter === 'playlist' ? 'playlist' : 'video';
  const videoCategory = filter === 'album' ? '10' : undefined;

  const data = await youtubeGet('/search', {
    part: 'snippet',
    q: query,
    maxResults: 20,
    pageToken,
    type,
    videoCategoryId: videoCategory,
    topicId: filter === 'artist' ? '/m/04rlf' : undefined
  });

  const items = await normalizeItems(data.items || []);
  return { items, nextPageToken: data.nextPageToken || null };
};

export const getTrendingMusic = async () => {
  const data = await youtubeGet('/videos', {
    part: 'snippet,contentDetails',
    chart: 'mostPopular',
    videoCategoryId: '10',
    maxResults: 20,
    regionCode: 'US'
  });

  return (data.items || []).map((item) => ({
    videoId: item.id,
    title: item.snippet?.title || 'Unknown title',
    channelTitle: item.snippet?.channelTitle || 'Unknown artist',
    thumbnail:
      item.snippet?.thumbnails?.high?.url ||
      item.snippet?.thumbnails?.medium?.url ||
      item.snippet?.thumbnails?.default?.url ||
      '',
    duration: parseISODuration(item.contentDetails?.duration)
  }));
};

export const getRecommendedMusic = async (seed = 'Top music hits') => {
  const { items } = await searchYouTube({ query: seed, filter: 'song' });
  return items;
};
