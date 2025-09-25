/**
 * Generates a URL for an icon using the weserv.nl service
 * @param icon - The icon name (e.g., 'html', 'javascript', 'css')
 * @param width - Icon width (default: 50)
 * @param height - Icon height (default: 50)
 * @returns The generated icon URL
 */
export const generateIconUrl = (
  icon: string,
  width: number = 50,
  height: number = 50
): string => {
  return `https://images.weserv.nl/?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FPKief%2Fvscode-material-icon-theme%405.27.0%2Ficons%2F${icon}.svg&w=${width}&h=${height}`;
};

/**
 * Generates URLs for multiple icons
 * @param icons - Array of icon names
 * @param width - Icon width (default: 50)
 * @param height - Icon height (default: 50)
 * @returns Array of generated icon URLs
 */
export const generateIconUrls = (
  icons: string[],
  width: number = 50,
  height: number = 50
): string[] => {
  return icons.map((icon) => generateIconUrl(icon, width, height));
};
