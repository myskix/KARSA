/**
 * Reusable Button Component
 */

export const Button = ({ text, type = 'primary', icon = null, onClick = '', classNames = '' }) => {
  const baseStyle = "w-full py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 touch-manipulation";
  
  const variants = {
    primary: "bg-karsa-primary text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 hover:shadow-lg focus:ring-blue-500",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-200",
    outline: "bg-transparent text-karsa-primary border-2 border-karsa-primary hover:bg-blue-50 focus:ring-blue-500",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-100"
  };

  const style = `${baseStyle} ${variants[type]} ${classNames}`;

  const iconSvg = icon ? `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}" />
    </svg>
  ` : '';

  // Use proper escaping if passing stringified function for onclick, 
  // but for string HTML generation, it's often better to just use classes and attach listeners later.
  // We'll support an inline onclick string for simple cases.
  return `
    <button class="${style}" ${onClick ? `onclick="${onClick}"` : ''}>
      ${iconSvg}
      <span>${text}</span>
    </button>
  `;
};
