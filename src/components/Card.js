/**
 * Card Component
 * Clean, modern container with subtle shadow.
 */

export const Card = ({ children, padding = 'p-5', classNames = '' }) => {
  return `
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${padding} ${classNames}">
      ${children}
    </div>
  `;
};
