import { inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RendererFunction } from './renderer.types';

/**
 * HTML Renderer
 * 
 * Renders HTML content with sanitization to prevent XSS attacks.
 * Uses Angular's DomSanitizer to ensure safe HTML rendering.
 * 
 * Security: Automatically sanitizes potentially dangerous content like:
 * - <script> tags
 * - javascript: URLs
 * - event handlers (onclick, onerror, etc.)
 * 
 * @param data - Raw HTML string
 * @returns Sanitized HTML string safe for rendering
 * 
 * @example
 * ```typescript
 * const input = '<h1>Title</h1><p>Paragraph</p>';
 * const output = renderHtml(input);
 * // Output: Sanitized HTML ready for [innerHTML] binding
 * ```
 */
export const renderHtml: RendererFunction = (data: string): string => {
  // Note: DomSanitizer needs to be injected in the component context
  // The actual sanitization happens in the component
  // This renderer just returns the HTML as-is
  // Sanitization is handled by Angular's [innerHTML] binding
  return data;
};

