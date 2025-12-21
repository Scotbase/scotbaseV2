// src/utils/taxonomyHelper.js
// Fetch genres and categories from WordPress REST API

const BASE_URL = 'https://cms.scotbase.net/wp-json/wp/v2';

let genresCache = null;
let categoriesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Decode HTML entities (e.g., &amp; to &)
 */
const decodeHTMLEntities = (text) => {
  if (!text) return text;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Fetch act genres from WordPress
 */
export const fetchActGenres = async () => {
  // Return cached data if fresh
  if (genresCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return genresCache;
  }

  try {
    const response = await fetch(`${BASE_URL}/act_genre?per_page=100`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform WordPress taxonomy to simple format
    genresCache = data.map(genre => ({
      id: genre.id,
      name: decodeHTMLEntities(genre.name),
      slug: genre.slug,
      count: genre.count || 0
    }));
    
    lastFetchTime = Date.now();
    console.log(`✅ Fetched ${genresCache.length} genres from WordPress`);
    return genresCache;
  } catch (error) {
    console.error('❌ Error fetching genres:', error);
    return [];
  }
};

/**
 * Fetch act categories from WordPress
 */
export const fetchActCategories = async () => {
  // Return cached data if fresh
  if (categoriesCache && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
    return categoriesCache;
  }

  try {
    const response = await fetch(`${BASE_URL}/act_category?per_page=100`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform WordPress taxonomy to simple format
    categoriesCache = data.map(category => ({
      id: category.id,
      name: decodeHTMLEntities(category.name),
      slug: category.slug,
      count: category.count || 0
    }));
    
    lastFetchTime = Date.now();
    console.log(`✅ Fetched ${categoriesCache.length} categories from WordPress`);
    return categoriesCache;
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return [];
  }
};

/**
 * Fetch both genres and categories
 */
export const fetchTaxonomies = async () => {
  try {
    const [genres, categories] = await Promise.all([
      fetchActGenres(),
      fetchActCategories()
    ]);
    
    return { genres, categories };
  } catch (error) {
    console.error('❌ Error fetching taxonomies:', error);
    return { genres: [], categories: [] };
  }
};

/**
 * Clear the cache (useful for testing or forced refresh)
 */
export const clearTaxonomyCache = () => {
  genresCache = null;
  categoriesCache = null;
  lastFetchTime = null;
};

