/**
 * Extracts the current user's ID from localStorage.
 * Checks the 'user' object first, falls back to 'userId' key.
 */
export const getUserId = () =>
  JSON.parse(localStorage.getItem('user'))?.id || localStorage.getItem('userId') || '';
