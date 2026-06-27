/**
 * Simple Hash-based Router for Vanilla JS
 */

const routes = {};

export const registerRoute = (path, pageComponent) => {
  routes[path] = pageComponent;
};

export const navigateTo = (path) => {
  window.location.hash = path;
};

export const initRouter = (outletElement) => {
  const handleRouteChange = async () => {
    // default to #splash if no hash or first load
    let path = window.location.hash.replace('#', '') || 'splash';
    
    // Redirect splash to home if they somehow navigate to it directly
    // but typically splash auto-redirects. 
    // Here we'll just let the pageComponent handle its logic.
    
    const pageComponent = routes[path] || routes['home'];
    
    if (pageComponent) {
      // Small fade-out effect before swapping content
      outletElement.classList.add('opacity-0');
      
      setTimeout(async () => {
        outletElement.innerHTML = await pageComponent();
        // small delay to allow DOM to render before fade-in
        setTimeout(() => {
          outletElement.classList.remove('opacity-0');
          // Dispatch custom event for page loaded to bind events inside the page
          document.dispatchEvent(new CustomEvent('pageLoaded', { detail: { path } }));
        }, 50);
      }, 150);
    }
  };

  // Add CSS transition class to outlet
  outletElement.classList.add('transition-opacity', 'duration-200');

  window.addEventListener('hashchange', handleRouteChange);
  
  // Initial load
  handleRouteChange();
};
