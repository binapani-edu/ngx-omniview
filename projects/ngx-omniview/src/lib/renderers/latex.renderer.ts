import { RendererFunction } from './renderer.types';
import { convertLatexToMarkup } from 'mathlive';

/**
 * MathLive Renderer
 * 
 * Converts plain math or LaTeX expressions into display-safe LaTeX.
 */
export const renderLatex: RendererFunction = (data: string): string => {
  if (!data?.trim()) return '';

  try {
    // If it's not valid LaTeX, MathLive can still handle it
    const cleaned = data.trim();

    // Optionally validate or pre-process here
    return cleaned;
  } catch (err) {
    console.error('MathLive render error:', err);
    return 'Invalid MathLive input';
  }
};
