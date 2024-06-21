/**
 * serviceWorker
 *
 */
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', async () => {
    // Register the service worker from the file specified
    navigator.serviceWorker.register('/sw.js')
  })
}
