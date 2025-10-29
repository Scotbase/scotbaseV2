// src/utils/imageHelper.js
const getPlaceholderImage = () => {
  // Use local placeholder image for all artists
  return '/images/placeholder.svg';
};

export const handleImageError = (e, artist) => {
  e.target.onerror = null; // Prevent infinite loop
  e.target.src = getPlaceholderImage();
};

