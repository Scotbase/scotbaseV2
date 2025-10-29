// src/utils/cmsHelper.js
// Helper functions to read content from Decap CMS

/**
 * Fetch all acts from the CMS (content/acts folder)
 * In production, these would be read from the markdown files
 * For now, we'll use a dynamic import approach
 */
export const fetchActsFromCMS = async () => {
  try {
    // Try to fetch the acts directory listing
    // Note: This works because the files are in the public folder
    // You'll need to manually add act IDs here as you create them in the CMS
    // Or use a build-time script to generate this list
    
    const actFiles = [
      'abba-a-rival-quartet',
      'adele-tribute',
      // Add new act filenames here (without .md extension)
      // When you create acts in the CMS, add their slugs here
    ];
    
    const acts = [];
    
    for (const actId of actFiles) {
      const act = await fetchActFromCMS(actId);
      if (act) acts.push(act);
    }
    
    console.log(`📂 Loaded ${acts.length} act file(s) from CMS`);
    return acts;
  } catch (error) {
    console.error('Error fetching acts from CMS:', error);
    return [];
  }
};

/**
 * Parse a markdown file with frontmatter into an act object
 */
export const parseMarkdownAct = (content, filename) => {
  try {
    // Extract frontmatter (content between --- markers)
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);
    
    if (!match) return null;
    
    const frontmatter = match[1];
    const data = {};
    
    // Parse YAML-style frontmatter
    const lines = frontmatter.split('\n');
    let currentKey = null;
    let currentList = [];
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      // Check if it's a list item
      if (line.trim().startsWith('-') && currentKey) {
        const value = line.trim().substring(1).trim();
        currentList.push(value);
      } else {
        // Save previous list if any
        if (currentKey && currentList.length > 0) {
          data[currentKey] = currentList;
          currentList = [];
        }
        
        // Parse key-value pair
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
          currentKey = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          
          if (value === '') {
            // This might be a list
            currentList = [];
          } else {
            // Convert value types
            if (value === 'true') data[currentKey] = true;
            else if (value === 'false') data[currentKey] = false;
            else if (!isNaN(value) && value !== '') data[currentKey] = Number(value);
            else data[currentKey] = value;
            currentKey = null;
          }
        }
      }
    }
    
    // Save last list if any
    if (currentKey && currentList.length > 0) {
      data[currentKey] = currentList;
    }
    
    // Generate an ID from filename
    const id = filename.replace(/\.md$/, '').replace(/^.*\//, '');
    
    return {
      id,
      name: data.title,
      tribute: data.tribute,
      image: data.image,
      parentCategory: data.parentCategory,
      genre: data.genre,
      location: data.location,
      price: data.price,
      description: data.description,
      featured: data.featured,
      availability: data.availability,
      bookingCount: data.bookingCount,
      tags: data.tags || [],
      categories: data.categories || [],
      keywords: data.keywords || []
    };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return null;
  }
};

/**
 * Fetch a single act by ID from CMS
 */
export const fetchActFromCMS = async (id) => {
  try {
    const response = await fetch(`/content/acts/${id}.md`);
    if (!response.ok) {
      console.error(`Act ${id} not found`);
      return null;
    }
    
    const content = await response.text();
    return parseMarkdownAct(content, `${id}.md`);
  } catch (error) {
    console.error(`Error fetching act ${id}:`, error);
    return null;
  }
};

