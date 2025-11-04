/// <reference path="../../types/latex.js.d.ts" />
import { parse, HtmlGenerator } from 'latex.js';
import { RendererFunction } from './renderer.types';

/**
 * Pre-process LaTeX to convert unsupported environments to supported ones
 * 
 * Complete mapping based on LaTeX2e and AMSMath specifications:
 * - INLINE MATH: \(...\), \begin{math}...\end{math} → $...$
 * - DISPLAY MATH: \[...\], equation, align, gather, etc. → $$...$$
 * - SPECIAL: array, cases, split, matrices → left as-is (used inside math mode)
 * 
 * @param latex - Raw LaTeX source
 * @returns Processed LaTeX compatible with latex.js
 */
function preprocessLatex(latex: string): string {
  let processed = latex;

  // ========================================
  // convert inline math to $...$
  // ========================================
  
  // convert \(...\) to $...$
  processed = processed.replace(
    /\\\(([\s\S]*?)\\\)/g,
    (match, content) => `$${content}$`
  );

  // convert \begin{math}...\end{math} to $...$
  processed = processed.replace(
    /\\begin\{math\}([\s\S]*?)\\end\{math\}/g,
    (match, content) => `$${content.trim()}$`
  );

  // ========================================
  // convert DISPLAY MATH to $$...$$
  // ========================================

  // convert \[...\] to $$...$$
  processed = processed.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (match, content) => `$$${content.trim()}$$`
  );

  // convert \begin{displaymath}...\end{displaymath} to $$...$$
  processed = processed.replace(
    /\\begin\{displaymath\}([\s\S]*?)\\end\{displaymath\}/g,
    (match, content) => `$$${content.trim()}$$`
  );

  // convert AMS and standard display math environments to $$...$$
  const displayMathEnvs = [
    'equation', 'equation*',
    'align', 'align*',
    'alignat', 'alignat*',
    'gather', 'gather*',
    'multline', 'multline*',
    'flalign', 'flalign*',
    'eqnarray', 'eqnarray*',
    'IEEEeqnarray', 'IEEEeqnarray*'
  ];

  displayMathEnvs.forEach(env => {
    const regex = new RegExp(
      `\\\\begin\\{${env.replace(/\*/g, '\\*')}\\}([\\s\\S]*?)\\\\end\\{${env.replace(/\*/g, '\\*')}\\}`,
      'g'
    );
    
    processed = processed.replace(regex, (match, content) => {
      // clean up the content: remove labels, tags, alignment markers
      const cleanContent = content
        .replace(/\\label\{[^}]*\}/g, '')
        .replace(/\\tag\{[^}]*\}/g, '')
        .replace(/&/g, ' ')
        .replace(/\\\\/g, '\\\\ ')
        .trim();
      
      return `$$${cleanContent}$$`;
    });
  });

  return processed;
}

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
    // pre-process latex to convert unsupported environments to supported ones
    const processedLatex = preprocessLatex(data);
    
    // create HTML generator exactly as latex.js playground does
    const generator = new HtmlGenerator({
      hyphenate: true,
    });

    // CRITICAL: Reset generator before each parse (exactly like playground)
    // Without this, generator state accumulates across renders causing issues
    generator.reset();
    
    // parse latex and generate HTML
    const parsed = parse(processedLatex, { generator });
    
    // Get the full HTML document (same as playground)
    const htmlDocument = parsed.htmlDocument();
    
    // Extract head content - includes <link> tags for CSS and <style> tags
    const headHTML = htmlDocument.head.innerHTML;
    
    // CRITICAL: Preserve body element structure with its classes
    // latex.js CSS targets .body class and uses CSS Grid
    // We need to preserve the body wrapper, not just innerHTML
    const bodyElement = htmlDocument.body;
    const bodyClasses = bodyElement.className;
    const bodyHTML = bodyElement.innerHTML;
    
    // Extract inline styles from head (style tags work in innerHTML)
    // Note: <link> tags won't work in innerHTML - CSS files need to be loaded separately
    const stylesHTML = convertLinksToInlineStyles(headHTML);
    
    // Wrap body content in a div with the same classes as the body element
    // This preserves the CSS Grid structure and styling
    const bodyWrapper = bodyClasses 
      ? `<div class="${bodyClasses}">${bodyHTML}</div>`
      : `<div class="body">${bodyHTML}</div>`;
    
    // Return: inline styles + body wrapper (preserves CSS structure)
    return `${stylesHTML}${bodyWrapper}`;
    
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
 * Convert <link> tags to inline <style> tags for innerHTML compatibility
 * Also extracts existing <style> tags
 * Note: <link> tags for external CSS won't work in innerHTML, so we need inline styles
 */
function convertLinksToInlineStyles(headHTML: string): string {
  // Extract all <style> tags (these work fine in innerHTML)
  const styleTags: string[] = [];
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let match;
  while ((match = styleRegex.exec(headHTML)) !== null) {
    styleTags.push(match[0]);
  }
  
  // For <link> tags, we can't load external CSS in innerHTML
  // The CSS files need to be included separately in Angular's build
  // For now, just return the style tags we found
  // TODO: Consider loading latex.js CSS files separately in angular.json styles
  
  return styleTags.join('\n');
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
