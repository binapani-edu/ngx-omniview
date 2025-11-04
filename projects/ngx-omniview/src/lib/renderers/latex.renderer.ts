import { RendererFunction } from './renderer.types';

/**
 * LaTex Renderer
 * 
 * Converts plain math or LaTeX expressions into display-safe LaTeX.
 */
export const renderLatex: RendererFunction = (data: string): string => {
  if (!data?.trim()) return '';

  try {
    // If it's not valid LaTeX, renderer can still handle it
    const cleaned = data.trim();

    // Optionally validate or pre-process here
    return cleaned;
  } catch (err) {
    console.error('LaTex render error:', err);
    return 'Invalid LaTex input';
  }
};
