import { renderHtml } from './html.renderer';
import { renderJson } from './json.renderer';
import { renderLatex } from './latex.renderer';
import { renderMarkdown } from './markdown.renderer';
import { renderMathjax } from './mathjax.renderer';
import { RendererRegistry } from './renderer.types';
import { renderText } from './text.renderer';

/**
 * Default placeholder renderer for formats not yet implemented
 * Shows "coming soon" message with the raw data
 */
const renderPlaceholder = (format: string) => (data: string): string => {
  return `[${format} rendering - coming soon]\n\n${data}`;
};

/**
 * Renderer Registry
 * 
 * Central registry mapping each format to its renderer function.
 * 
 * To add a new renderer:
 * 1. Create a new file: `[format].renderer.ts`
 * 2. Implement the RendererFunction
 * 3. Import and register it here
 * 
 * @example
 * ```typescript
 * // Adding a new renderer
 * import { renderMarkdown } from './markdown.renderer';
 * 
 * export const rendererRegistry: RendererRegistry = {
 *   ...
 *   markdown: renderMarkdown,
 *   ...
 * };
 * ```
 */
export const rendererRegistry: RendererRegistry = {
  text: renderText,
  html: renderHtml,
  markdown: renderMarkdown,
  json: renderJson,
  mathjax: renderMathjax,
  latex: renderLatex,
  
  // Placeholders for future renderers
  code: renderPlaceholder('code'),
};

