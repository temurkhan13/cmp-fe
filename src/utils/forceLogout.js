/**
 * Clears all auth tokens from localStorage and redirects to login
 * if the user is not already on a public page.
 */
export const forceLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
  localStorage.removeItem('accessToken');
  const path = window.location.pathname;
  if (path !== '/log-in' && path !== '/sign-up' && path !== '/' && !path.startsWith('/privacy') && !path.startsWith('/terms') && !path.startsWith('/forgot')) {
    setTimeout(() => { window.location.href = '/log-in'; }, 0);
  }
};
