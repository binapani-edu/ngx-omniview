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
  // INLINE MATH CONVERSIONS → $...$
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
  // DISPLAY MATH conversions → $$...$$
  // ========================================

  // convert \[...\] to $$...$$
  processed = processed.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (match, content) => `$$${content.trim()}$$`
  );

  // list of display math environments to convert to $$...$$
  const displayMathEnvironments = [
    // Standard LaTeX
    'displaymath',
    
    // numbered equations (AMSmath)
    'equation', 'equation*',
    'align', 'align*',
    'alignat', 'alignat*',
    'gather', 'gather*',
    'multline', 'multline*',
    'flalign', 'flalign*',
    
    // older LaTeX (obsolete but still used)
    'eqnarray', 'eqnarray*',
    
    // IEEE (if encountered)
    'IEEEeqnarray', 'IEEEeqnarray*'
  ];

  // convert each display math environment to $$...$$
  displayMathEnvironments.forEach(env => {
    // match \begin{env}...\end{env} with content in between (including newlines)
    const regex = new RegExp(
      `\\\\begin\\{${env.replace(/\*/g, '\\*')}\\}([\\s\\S]*?)\\\\end\\{${env.replace(/\*/g, '\\*')}\\}`,
      'g'
    );
    
    processed = processed.replace(regex, (match, content) => {
      // clean up the content: remove \label, \tag, alignment markers, etc.
      let cleanContent = content
        .replace(/\\label\{[^}]*\}/g, '')  // remove labels
        .replace(/\\tag\{[^}]*\}/g, '')    // remove custom tags
        .replace(/&/g, ' ')                // remove alignment markers
        .replace(/\\\\/g, '\\\\ ')         // preserve line breaks with space
        .trim();
      
      return `$$${cleanContent}$$`;
    });
  });

  // remove problematic \usepackage declarations that aren't bundled
  // packages like hyperref, graphicx work fine even though not all features are supported
  const unsupportedPackages = [
    'amsmath', 'amsthm', 'amssymb', 'amsfonts',  // ams math packages - cause bundle errors
    'tikz', 'pgf', 'tikz-cd',                    // graphics packages - cause bundle errors
    // NOTE: hyperref, graphicx, geometry, fancyhdr, etc. can stay - they don't cause errors
    // latex.js just ignores unsupported commands from these packages
  ];

  unsupportedPackages.forEach(pkg => {
    // remove \usepackage{pkg} or \usepackage[options]{pkg}
    const regex = new RegExp(`\\\\usepackage(?:\\[[^\\]]*\\])?\\{${pkg}\\}`, 'g');
    processed = processed.replace(regex, `% Package ${pkg} removed (not supported)`);
  });

  // also handle multiple packages in one \usepackage
  processed = processed.replace(
    /\\usepackage(?:\[[^\]]*\])?\{([^}]+)\}/g,
    (match, packages) => {
      const pkgList = packages.split(',').map((p: string) => p.trim());
      const filtered = pkgList.filter((p: string) => !unsupportedPackages.includes(p));
      
      if (filtered.length === 0) {
        return `% Packages removed (not bundled or supported)`;
      } else if (filtered.length < pkgList.length) {
        // some packages removed
        return `\\usepackage{${filtered.join(',')}} % Some packages removed`;
      }
      // keep as-is if all packages are okay
      return match;
    }
  );

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
    // Pre-process LaTeX to handle unsupported features
    const processedLatex = preprocessLatex(data);
    
    // Create HTML generator with hyphenation enabled
    const generator = new HtmlGenerator({
      hyphenate: true,
    });

    // Parse LaTeX and generate HTML
    const parsed = parse(processedLatex, { generator });
    
    // Get styles and scripts from the generator
    const stylesAndScriptsFragment = parsed.stylesAndScripts();
    const stylesContainer = document.createElement('div');
    stylesContainer.appendChild(stylesAndScriptsFragment);
    const styles = stylesContainer.innerHTML;
    
    // Get the body content as a DocumentFragment
    const bodyFragment = parsed.domFragment();
    const bodyContainer = document.createElement('div');
    bodyContainer.appendChild(bodyFragment);
    const bodyContent = bodyContainer.innerHTML;
    
    // Combine styles and body content
    // Keep structure minimal to preserve latex.js CSS selectors
    return `${styles}${bodyContent}`;
    
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
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
