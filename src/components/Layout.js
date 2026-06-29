/**
 * Layout Component
 * Wraps the app in a mobile-first container.
 */

export const Layout = (content) => {
  return `
    <div id="router-outlet" class="flex-1 w-full flex flex-col relative pb-safe bg-white mx-auto scroll-smooth">
      ${content}
    </div>
  `;
};
