import { RendererFunction } from './renderer.types';

/**
 * Markdown Renderer
 * 
 * The actual parsing and rendering of Markdown is handled by ngx-markdown
 * in the component template. This renderer simply returns the raw string.
 * 
 * @param data - Raw Markdown content
 * @returns The unmodified Markdown string
 * 
 * @example
 * ```typescript
 * const markdown = renderMarkdown('# Hello World');
 * // Output: "# Hello World"
 * ```
 */
export const renderMarkdown: RendererFunction = (data: string): string => {
  return data;
};
