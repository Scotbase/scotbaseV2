/**
 * Decodes HTML entities in a string
 * @param {string} html - String containing HTML entities
 * @returns {string} - Decoded string
 */
export const decodeHtmlEntities = (html) => {
  if (!html || typeof html !== 'string') return html;
  
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

/**
 * Decodes HTML entities using a simple regex approach (works without DOM)
 * @param {string} html - String containing HTML entities
 * @returns {string} - Decoded string
 */
export const decodeHtmlEntitiesSimple = (html) => {
  if (!html || typeof html !== 'string') return html;
  
  const entityMap = {
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  };
  
  return html.replace(/&#?\w+;/g, (match) => {
    return entityMap[match] || match;
  });
};

