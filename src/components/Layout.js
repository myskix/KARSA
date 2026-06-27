/**
 * Layout Component
 * Wraps the app in a mobile-first container.
 */

export const Layout = (content) => {
  return `
    <div class="max-w-md mx-auto bg-slate-50 min-h-screen relative shadow-2xl flex flex-col overflow-hidden text-slate-900 font-sans">
      <div id="router-outlet" class="flex-1 overflow-y-auto pb-24">
        ${content}
      </div>
    </div>
  `;
};
