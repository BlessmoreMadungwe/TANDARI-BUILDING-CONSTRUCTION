// Navigate without a full page reload, then notify App that the current path changed.
export function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keeps route matching consistent for "/", "/about", and trailing-slash URLs.
export function normalizePath(pathname) {
  if (!pathname || pathname === '/index.html') {
    return '/';
  }

  return pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
}
