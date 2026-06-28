(function () {
  if (!('serviceWorker' in navigator)) return;
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (isLocal) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(r => r.unregister());
    });
    if (window.caches) {
      caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
    }
    return;
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(err => console.warn('[Fluir] SW registration failed:', err));
  });
})();
