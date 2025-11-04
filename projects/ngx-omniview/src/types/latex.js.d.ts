/**
 * Type declarations for latex.js library
 * 
 * latex.js is a JavaScript library that doesn't ship with TypeScript definitions.
 * This file provides basic type definitions for the library's API.
 * 
 * Library: latex.js (npm package)
 * Version: 0.12.6+
 * Repository: https://github.com/michael-brade/LaTeX.js
 * 
 * Note: This is a custom declaration file. If latex.js adds official TypeScript
 * support in the future, this file can be removed in favor of the official types.
 */

declare module 'latex.js' {
  /**
   * Options for HtmlGenerator
   */
  export interface HtmlGeneratorOptions {
    hyphenate?: boolean;
    languagePatterns?: any;
    styles?: string[];
    CustomMacros?: any;
  }

  /**
   * HTML Generator for LaTeX to HTML conversion
   */
  export class HtmlGenerator {
    constructor(options?: HtmlGeneratorOptions);
    
    /**
     * Reset the generator state
     */
    reset(): void;
    
    /**
     * Get the full HTML document representation
     * @param baseURL - Base URL for assets (optional)
     * @returns HTMLDocument with head and body
     */
    htmlDocument(baseURL?: string): HTMLDocument;
    
    /**
     * Get the DOM fragment containing the rendered content
     * @returns DocumentFragment with body content
     */
    domFragment(): DocumentFragment;
    
    /**
     * Get styles and scripts needed for rendering
     * @param baseURL - Base URL for assets (optional)
     * @returns DocumentFragment containing link and script elements
     */
    stylesAndScripts(baseURL?: string): DocumentFragment;
  }

  /**
   * Parse options
   */
  export interface ParseOptions {
    generator?: HtmlGenerator;
  }

  /**
   * Parsed LaTeX document (extends HtmlGenerator)
   */
  export interface ParsedDocument extends HtmlGenerator {
    htmlDocument(baseURL?: string): HTMLDocument;
    domFragment(): DocumentFragment;
    stylesAndScripts(baseURL?: string): DocumentFragment;
  }

  /**
   * Parse LaTeX source code and generate HTML
   * @param latex - LaTeX source code string
   * @param options - Parse options including generator
   * @returns Parsed document with HTML generation methods
   */
  export function parse(latex: string, options?: ParseOptions): ParsedDocument;

  /**
   * Syntax error class (if thrown during parsing)
   */
  export class SyntaxError extends Error {
    constructor(message: string);
  }
}

