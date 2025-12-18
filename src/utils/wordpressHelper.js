// src/utils/wordpressHelper.js
// Helper to fetch and parse acts from WordPress API

const WP_API_BASE = 'https://scotbase.net/wp-json/wp/v2';

/**
 * Fetch taxonomy terms and media by IDs
 */
const categoryCache = {};
const genreCache = {};
const mediaCache = {};

export const fetchCategoryName = async (categoryId) => {
  if (categoryCache[categoryId]) {
    return categoryCache[categoryId];
  }

  try {
    const response = await fetch(`${WP_API_BASE}/act_category/${categoryId}`);
    const category = await response.json();
    categoryCache[categoryId] = { name: category.name, slug: category.slug };
    return categoryCache[categoryId];
  } catch (error) {
    console.error(`Error fetching category ${categoryId}:`, error);
    return null;
  }
};

export const fetchGenreName = async (genreId) => {
  if (genreCache[genreId]) {
    return genreCache[genreId];
  }

  try {
    const response = await fetch(`${WP_API_BASE}/act_genre/${genreId}`);
    const genre = await response.json();
    genreCache[genreId] = { name: genre.name, slug: genre.slug };
    return genreCache[genreId];
  } catch (error) {
    console.error(`Error fetching genre ${genreId}:`, error);
    return null;
  }
};

export const fetchMediaUrl = async (mediaId) => {
  if (!mediaId || typeof mediaId !== 'number') {
    return null;
  }

  if (mediaCache[mediaId]) {
    return mediaCache[mediaId];
  }

  try {
    // Try to fetch media without authentication
    const response = await fetch(`${WP_API_BASE}/media/${mediaId}`);
    
    if (response.status === 401) {
      console.warn(`⚠️ Media ${mediaId} requires authentication. Using direct URL construction.`);
      // Fall back to constructing URL - this won't work reliably
      // Better to configure WordPress to allow public media access
      return null;
    }
    
    if (!response.ok) {
      throw new Error(`Media API error: ${response.status}`);
    }
    
    const media = await response.json();
    const url = media.source_url || media.url || null;
    mediaCache[mediaId] = url;
    return url;
  } catch (error) {
    console.error(`Error fetching media ${mediaId}:`, error);
    return null;
  }
};

/**
 * Parse WordPress act data to our app format
 */
export const parseWordPressAct = async (wpAct) => {
  try {
    // Get category and genre data - handle both arrays and single values
    let categoryIds = wpAct.act_category || wpAct.acf?.category || [];
    let genreIds = wpAct.act_genre || wpAct.acf?.genre || [];
    
    // Ensure they're arrays
    if (!Array.isArray(categoryIds)) {
      categoryIds = categoryIds ? [categoryIds] : [];
    }
    if (!Array.isArray(genreIds)) {
      genreIds = genreIds && genreIds !== false ? [genreIds] : [];
    }
    
    const [categories, genres] = await Promise.all([
      Promise.all(categoryIds.map(catId => fetchCategoryName(catId))),
      Promise.all(genreIds.map(genreId => fetchGenreName(genreId)))
    ]);

    const validCategories = categories.filter(c => c !== null);
    const validGenres = genres.filter(g => g !== null);

    // Extract image - prioritize ACF fields, then featured_media
    // Use large size for cards - good quality without blur
    let imageUrl = '/images/placeholder.svg';
    
    // Check ACF fields (can be an object with url, URL string, or numeric ID)
    // Priority: act_image > icon_image > detail_image > main_image > image > featured_media
    if (wpAct.acf?.act_image?.sizes?.large) {
      // Use large size (1024px) - high quality for cards
      imageUrl = wpAct.acf.act_image.sizes.large;
    } else if (wpAct.acf?.act_image?.sizes?.medium_large) {
      // Fall back to medium_large (768px)
      imageUrl = wpAct.acf.act_image.sizes.medium_large;
    } else if (wpAct.acf?.act_image?.sizes?.medium_large) {
      // Fall back to medium_large (768px)
      imageUrl = wpAct.acf.act_image.sizes.medium_large;
    } else if (wpAct.acf?.act_image?.url) {
      // Fall back to full size
      imageUrl = wpAct.acf.act_image.url;
    } else if (typeof wpAct.acf?.act_image === 'number') {
      // ACF act_image is a numeric ID
      const fetchedUrl = await fetchMediaUrl(wpAct.acf.act_image);
      if (fetchedUrl) imageUrl = fetchedUrl;
    } else if (typeof wpAct.acf?.act_image === 'string' && wpAct.acf.act_image.startsWith('http')) {
      // ACF act_image is a direct URL string
      imageUrl = wpAct.acf.act_image;
    } else if (wpAct.acf?.icon_image?.sizes?.large) {
      imageUrl = wpAct.acf.icon_image.sizes.large;
    } else if (wpAct.acf?.icon_image?.sizes?.medium_large) {
      imageUrl = wpAct.acf.icon_image.sizes.medium_large;
    } else if (wpAct.acf?.icon_image?.url) {
      // ACF icon_image object with URL
      imageUrl = wpAct.acf.icon_image.url;
    } else if (typeof wpAct.acf?.icon_image === 'number') {
      // ACF icon_image is a numeric ID
      const fetchedUrl = await fetchMediaUrl(wpAct.acf.icon_image);
      if (fetchedUrl) imageUrl = fetchedUrl;
    } else if (typeof wpAct.acf?.icon_image === 'string' && wpAct.acf.icon_image.startsWith('http')) {
      // ACF icon_image is a direct URL string
      imageUrl = wpAct.acf.icon_image;
    } else if (wpAct.acf?.detail_image?.url) {
      // Try detail_image as object
      imageUrl = wpAct.acf.detail_image.url;
    } else if (typeof wpAct.acf?.detail_image === 'number') {
      // Try detail_image as numeric ID
      const fetchedUrl = await fetchMediaUrl(wpAct.acf.detail_image);
      if (fetchedUrl) imageUrl = fetchedUrl;
    } else if (wpAct.acf?.main_image?.url) {
      imageUrl = wpAct.acf.main_image.url;
    } else if (wpAct.acf?.image?.url) {
      imageUrl = wpAct.acf.image.url;
    } else if (wpAct.featured_media && wpAct._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      // Fall back to WordPress featured media
      imageUrl = wpAct._embedded['wp:featuredmedia'][0].source_url;
    }

    // Extract detail image for artist detail page - use full size for best quality
    let detailImageUrl = imageUrl; // Default to same as card image
    if (wpAct.acf?.act_image?.url) {
      // Use full size URL for detail pages
      detailImageUrl = wpAct.acf.act_image.url;
    } else if (wpAct.acf?.act_image?.sizes?.['2048x2048']) {
      // Or use largest available size
      detailImageUrl = wpAct.acf.act_image.sizes['2048x2048'];
    } else if (wpAct.acf?.act_image?.sizes?.['1536x1536']) {
      detailImageUrl = wpAct.acf.act_image.sizes['1536x1536'];
    } else if (wpAct.acf?.detail_image?.url) {
      detailImageUrl = wpAct.acf.detail_image.url;
    }

    // Map to our app's format
    return {
      id: `wp-${wpAct.id}`, // Prefix with 'wp-' to avoid conflicts
      name: wpAct.title?.rendered || 'Untitled Act',
      tribute: wpAct.acf?.tribute_to || wpAct.title?.rendered || '',
      image: imageUrl,
      detailImage: detailImageUrl,
      parentCategory: validCategories[0]?.slug || null,
      act_category: validCategories.map(c => c.slug),
      genre: validGenres[0]?.name || 'Pop',
      act_genre: validGenres.map(g => g.slug),
      location: wpAct.acf?.location || 'Scotland',
      price: wpAct.acf?.price || 'POA',
      description: wpAct.acf?.description || wpAct.content?.rendered?.replace(/<[^>]*>/g, '') || wpAct.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
      featured: wpAct.acf?.featured || false,
      availability: wpAct.acf?.availability || 'Available',
      bookingCount: wpAct.acf?.booking_count || 0,
      rating: wpAct.acf?.rating || null,
      videoUrl: wpAct.acf?.video_url || null,
      tags: wpAct.acf?.tags || [],
      categories: validCategories.map(c => c.name),
      genres: validGenres.map(g => g.name),
      fromWordPress: true // Flag to identify WordPress acts
    };
  } catch (error) {
    console.error('Error parsing WordPress act:', error, wpAct);
    return null;
  }
};

/**
 * Fetch all acts from WordPress
 */
export const fetchActsFromWordPress = async () => {
  try {
    console.log('🔍 Fetching acts from WordPress API (scotbase.net)...');
    
    // Fetch with _embed and acf_format=standard to get full ACF data
    // The acf_format=standard parameter should return full image objects instead of IDs
    const response = await fetch(`${WP_API_BASE}/act?per_page=100&_embed&acf_format=standard`);
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const wpActs = await response.json();
    console.log(`✅ Received ${wpActs.length} acts from WordPress`);
    
    // Log first act's ACF data to debug
    if (wpActs.length > 0 && wpActs[0].acf) {
      console.log('🔍 Sample ACF data:', wpActs[0].acf);
    }

    // Parse all acts in parallel
    const parsedActs = await Promise.all(
      wpActs.map(wpAct => parseWordPressAct(wpAct))
    );

    // Filter out any null results from parsing errors
    const validActs = parsedActs.filter(act => act !== null);
    
    console.log(`📊 Successfully parsed ${validActs.length} WordPress acts`);
    return validActs;
  } catch (error) {
    console.error('❌ Error fetching acts from WordPress:', error);
    return [];
  }
};


