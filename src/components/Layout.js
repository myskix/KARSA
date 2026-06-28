/**
 * Layout Component
 * Wraps the app in a mobile-first container.
 */

export const Layout = (content) => {
  return `
    <div class="w-full max-w-md bg-slate-50 h-[100dvh] sm:h-[88vh] sm:rounded-[32px] sm:border-[8px] sm:border-slate-800 relative shadow-2xl flex flex-col overflow-hidden text-slate-900 font-sans">
      <div id="router-outlet" class="flex-1 overflow-y-auto pb-24 relative">
        ${content}
      </div>
    </div>
  `;
};
