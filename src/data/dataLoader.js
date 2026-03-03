// src/data/dataLoader.js
// Unified data loader that fetches from WordPress and CMS

// Using WordPress data from scotbase.net
// import { artists as hardcodedArtists } from './artists';
// import { fetchActsFromCMS } from '../utils/cmsHelper'; // Disabled for now
import { fetchActsFromWordPress } from '../utils/wordpressHelper';

let cachedActs = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Separate cache for lightweight home page acts
let cachedHomeActs = null;
let lastHomeFetchTime = null;

/**
 * Get all artists/acts - tries CMS first, falls back to hardcoded data
 * Results are cached for 5 minutes to avoid repeated fetches
 */
export const getAllArtists = async () => {
  // Return cached data if it's fresh
  if (cachedActs && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return cachedActs;
  }

  try {
    // Fetch from WordPress only (CMS is disabled for now)
    const wpActs = await fetchActsFromWordPress();
    
    if (wpActs && wpActs.length > 0) {
      cachedActs = wpActs;
      lastFetchTime = Date.now();
      return cachedActs;
    }
  } catch (error) {
    console.warn('⚠️ Failed to load acts from WordPress:', error);
  }

  // No data available
  cachedActs = [];
  lastFetchTime = Date.now();
  return cachedActs;
};

/**
 * Get a limited set of artists/acts for lightweight views
 * like the home page. This avoids loading the full catalogue
 * on initial landing.
 */
export const getHomePageActs = async (limit = 6) => {
  // Return cached data if it's fresh
  if (cachedHomeActs && lastHomeFetchTime && (Date.now() - lastHomeFetchTime < CACHE_DURATION)) {
    return cachedHomeActs.slice(0, limit);
  }

  try {
    const wpActs = await fetchActsFromWordPress(limit);

    if (wpActs && wpActs.length > 0) {
      cachedHomeActs = wpActs;
      lastHomeFetchTime = Date.now();
      return cachedHomeActs.slice(0, limit);
    }
  } catch (error) {
    console.warn('⚠️ Failed to load home page acts from WordPress:', error);
  }

  // Fallback to empty array – home page will use default hero images
  cachedHomeActs = [];
  lastHomeFetchTime = Date.now();
  return cachedHomeActs;
};

/**
 * Get a single artist by ID
 */
export const getArtistById = async (id) => {
  const allArtists = await getAllArtists();
  return allArtists.find(artist => String(artist.id) === String(id));
};

/**
 * Get featured artists
 */
export const getFeaturedArtists = async () => {
  const allArtists = await getAllArtists();
  return allArtists.filter(artist => artist.featured);
};

/**
 * Get popular artists (sorted by booking count)
 */
export const getPopularArtists = async (limit = 6) => {
  const allArtists = await getAllArtists();
  return [...allArtists]
    .sort((a, b) => (b.bookingCount || 0) - (a.bookingCount || 0))
    .slice(0, limit);
};

/**
 * Clear the cache (useful for testing or forced refresh)
 */
export const clearCache = () => {
  cachedActs = null;
  lastFetchTime = null;
};

/**
 * Get only CMS acts
 */
export const getCMSActs = async () => {
  const allArtists = await getAllArtists();
  return allArtists.filter(artist => artist.fromCMS);
};

/**
 * Get acts by parent category
 */
export const getActsByParentCategory = async (parentCategory) => {
  const allArtists = await getAllArtists();
  return allArtists.filter(artist => artist.parentCategory === parentCategory);
};

/**
 * Get all unique parent categories
 */
export const getParentCategories = async () => {
  const allArtists = await getAllArtists();
  const categories = allArtists
    .map(artist => artist.parentCategory)
    .filter(cat => cat); // Remove undefined/null values
  return [...new Set(categories)]; // Remove duplicates
};

