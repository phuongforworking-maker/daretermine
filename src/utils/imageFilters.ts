// Futuristic image filter utilities
// These filters create a cohesive aesthetic for user-uploaded images

export const applyFuturisticFilter = (imageUrl: string): string => {
  // Return the original URL - CSS filters will be applied via classes
  return imageUrl;
};

// CSS filter presets for futuristic aesthetic
export const filterPresets = {
  cyberpunk: 'grayscale(0.3) contrast(1.2) brightness(0.9) saturate(1.5) hue-rotate(200deg)',
  neon: 'contrast(1.3) brightness(0.85) saturate(1.8) hue-rotate(240deg)',
  matrix: 'grayscale(0.5) contrast(1.4) brightness(0.8) hue-rotate(120deg)',
  vaporwave: 'contrast(1.2) saturate(1.6) hue-rotate(280deg) brightness(0.9)',
  duotone: 'grayscale(1) contrast(1.3) brightness(0.9)',
  glitch: 'contrast(1.4) saturate(2) hue-rotate(200deg) brightness(0.85)',
};

export const getRandomFilter = (): string => {
  const filters = Object.values(filterPresets);
  return filters[Math.floor(Math.random() * filters.length)];
};
