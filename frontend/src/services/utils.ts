/**
 * Basic utility to sanitize input strings by removing potentially dangerous characters
 * and trimming whitespace.
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Basic removal of HTML tags
    .slice(0, 5000);     // Prevent extremely long inputs
};
