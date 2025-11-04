/// <reference path="../../types/latex.js.d.ts" />
import { parse, HtmlGenerator } from 'latex.js';
import { RendererFunction } from './renderer.types';

/**
 * LaTeX Renderer
 * 
 * Renders LaTeX documents to HTML using latex.js library.
 * Supports full LaTeX documents including \documentclass, \usepackage, sections, etc.
 * 
 * Features:
 * - Full document support (not just math)
 * - Handles common LaTeX packages
 * - Graceful error handling for unsupported features (TikZ, etc.)
 * - Hyphenation support
 * 
 * Limitations:
 * - Native LaTeX packages cannot be loaded directly
 * - Complex packages like TikZ require custom JavaScript implementations
 * - Some TeX constructs may not be fully supported
 * 
 * Security:
 * - latex.js generates HTML from LaTeX source, which is considered safe
 * - The output is rendered via Angular's [innerHTML] binding which provides
 *   automatic XSS protection for untrusted content
 * - Error messages are explicitly escaped using escapeHtml() to prevent XSS
 * 
 * @param data - Raw LaTeX source code (full document or fragment)
 * @returns HTML string ready for rendering with [innerHTML]
 * 
 * @example
 * ```typescript
 * const latex = `\\documentclass{article}\\begin{document}Hello\\end{document}`;
 * const html = renderLatex(latex);
 * // Output: HTML string with rendered LaTeX
 * ```
 */
export const renderLatex: RendererFunction = (data: string): string => {
  if (!data || !data.trim()) {
    return '';
  }

  try {
    // Create HTML generator with hyphenation enabled
    const generator = new HtmlGenerator({
      hyphenate: true,
    });

    // Parse LaTeX and generate HTML document
    const parsed = parse(data, { generator });
    
    // Get the full HTML document
    const htmlDocument = parsed.htmlDocument();
    
    // Extract head content (styles and scripts)
    const headContent = htmlDocument.head.innerHTML;
    
    // Extract body content (the actual rendered LaTeX)
    const bodyContent = htmlDocument.body.innerHTML;
    
    // Combine styles and body content
    // Wrap in a container div for easier styling
    // Styles are included in the head content from htmlDocument
    return `<div class="latex-output"><style>${extractStylesFromHead(headContent)}</style><div class="latex-content">${bodyContent}</div></div>`;
    
  } catch (error) {
    // Gracefully handle unsupported features or parse errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return `<div class="latex-error">
      <div class="latex-error-header">
        <strong>LaTeX Rendering Error</strong>
      </div>
      <div class="latex-error-message">
        <p>${escapeHtml(errorMessage)}</p>
        <p><em>This may be due to unsupported LaTeX packages or features (e.g., TikZ, PGF).</em></p>
      </div>
      <details class="latex-error-details">
        <summary>Show raw LaTeX source</summary>
        <pre class="latex-error-source">${escapeHtml(data)}</pre>
      </details>
    </div>`;
  }
};

/**
 * Extract CSS styles from head HTML content
 */
function extractStylesFromHead(headHTML: string): string {
  // Extract content from <style> tags and <link rel="stylesheet"> href URLs
  // For now, we'll include the styles inline
  // In a production app, you might want to load external stylesheets
  const styleMatch = headHTML.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  if (styleMatch) {
    return styleMatch.map(match => {
      const contentMatch = match.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      return contentMatch ? contentMatch[1] : '';
    }).join('\n');
  }
  return '';
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
