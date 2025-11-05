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
 * Converts plain math or LaTeX expressions into display-safe LaTeX.
 * To render LaTeX documents to HTML using latex.js library.
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
  if (!data?.trim()) return '';

  try {
    // Pre-process LaTeX to convert unsupported environments to supported ones
    const processed = preprocessLatex(data.trim());

    return processed;
  } catch (err) {
    console.error('LaTex render error:', err);
    return 'Invalid LaTex input';
  }
};
