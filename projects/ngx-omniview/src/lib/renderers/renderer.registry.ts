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
  
  // Placeholders for future renderers
  html: renderPlaceholder('html'),
  markdown: renderPlaceholder('markdown'),
  latex: renderPlaceholder('latex'),
  mathjax: renderPlaceholder('mathjax'),
  json: renderPlaceholder('json'),
  code: renderPlaceholder('code'),
};

