import { RendererFunction } from './renderer.types';

/**
 * MathJax Renderer
 * 
 * This renderer simply returns the raw string data containing MathJax/LaTeX syntax.
 * The actual rendering (typesetting) is handled in the component template
 * or by the MathJax directive.
 * 
 * @param data - Raw MathJax/LaTeX content
 * @returns The unmodified MathJax string
 * 
 * @example
 * ```typescript
 * const latex = renderMathjax('Euler’s Identity: $$e^{i\\pi} + 1 = 0$$');
 * // Output: "Euler’s Identity: $$e^{i\\pi} + 1 = 0$$"
 * ```
 */
export const renderMathjax: RendererFunction = (data: string): string => {
  return data;
};
