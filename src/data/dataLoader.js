// src/data/dataLoader.js
// Unified data loader that fetches from CMS

// Hardcoded data commented out - now using CMS only
// import { artists as hardcodedArtists } from './artists';
import { fetchActsFromCMS } from '../utils/cmsHelper';

let cachedActs = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
    // Fetch all acts from CMS
    const cmsActs = await fetchActsFromCMS();
    
    if (cmsActs && cmsActs.length > 0) {
      // Use CMS data only
      const cmsActsWithIds = cmsActs.map((act, index) => ({
        ...act,
        id: act.id || index + 1,
        fromCMS: true // Flag to identify CMS acts
      }));
      
      cachedActs = cmsActsWithIds;
      lastFetchTime = Date.now();
      
      console.log(`✅ Loaded ${cmsActsWithIds.length} acts from CMS`);
      return cachedActs;
    }
  } catch (error) {
    console.warn('⚠️ Failed to load acts from CMS:', error);
  }

  // No data available
  cachedActs = [];
  lastFetchTime = Date.now();
  console.log(`⚠️ No acts loaded - CMS data unavailable`);
  return cachedActs;
  
  /* HARDCODED DATA FALLBACK - Commented out, uncomment to restore
  // Fallback to hardcoded data only
  cachedActs = hardcodedArtists;
  lastFetchTime = Date.now();
  console.log(`📦 Using ${hardcodedArtists.length} hardcoded acts only`);
  return cachedActs;
  */
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

