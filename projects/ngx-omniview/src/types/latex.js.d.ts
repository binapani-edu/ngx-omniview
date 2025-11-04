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
   *
   * @see https://latex.js.org/api.html
   */
  export interface HtmlGeneratorOptions {
    /**
     * Default document class if parsing a document without preamble
     */
    documentClass?: string;

    /**
     * Additional custom macros (constructor/function)
     */
    CustomMacros?: any;

    /**
     * Enable or disable automatic hyphenation (default: enabled)
     */
    hyphenate?: boolean;

    /**
     * Language patterns object to use for hyphenation if enabled
     */
    languagePatterns?: any;

    /**
     * Additional CSS stylesheets to include
     */
    styles?: string[];
  }

  /**
   * HTML Generator for LaTeX to HTML conversion
   *
   * @see https://latex.js.org/api.html
   */
  export class HtmlGenerator {
    constructor(options?: HtmlGeneratorOptions);

    /**
     * Reset the generator state
     * Needs to be called before the generator is used for creating a second document.
     */
    reset(): void;

    /**
     * Get the full HTML document representation
     * Returns the full DOM HTMLDocument representation of the LaTeX source,
     * including <head> and <body>. Meant to be used as its own standalone webpage or in an <iframe>.
     *
     * @param baseURL - Base URL for assets (optional). If omitted, uses window.location.href or relative URLs.
     * @returns HTMLDocument with head and body
     */
    htmlDocument(baseURL?: string): HTMLDocument;

    /**
     * Get the DOM fragment containing the rendered content
     * Returns a DocumentFragment with the full page without stylesheets or scripts.
     *
     * @returns DocumentFragment with body content
     */
    domFragment(): DocumentFragment;

    /**
     * Get styles and scripts needed for rendering
     * Returns a DocumentFragment with <link> and <script> elements.
     * This usually is part of the <head> element.
     *
     * @param baseURL - Base URL for assets (optional). If given, files will be referenced with absolute URLs.
     * @returns DocumentFragment containing link and script elements
     */
    stylesAndScripts(baseURL?: string): DocumentFragment;

    /**
     * Apply lengths and geometry to DOM element
     * Sets CSS custom properties for LaTeX page geometry (textwidth, margins, etc.)
     *
     * @param el - DOM element to apply geometry to
     */
    applyLengthsAndGeometryToDom(el: HTMLElement): void;

    /**
     * Get the document title
     * Returns the title of the document as extracted from \title command
     *
     * @returns The document title string
     */
    documentTitle(): string;
  }

  /**
   * Parse options
   *
   * @see https://latex.js.org/api.html
   */
  export interface ParseOptions {
    /**
     * HtmlGenerator instance to use for generating output
     */
    generator: HtmlGenerator;
  }

  /**
   * Parse LaTeX source code and generate HTML
   *
   * This function parses the given input LaTeX document and returns the generator
   * that creates the output document.
   *
   * @param latex - LaTeX source code string (full document or fragment)
   * @param options - Parse options. Must contain a `generator` property with an instance of HtmlGenerator.
   * @returns The HtmlGenerator instance (same instance passed in options)
   *
   * @see https://latex.js.org/api.html
   */
  export function parse(latex: string, options: ParseOptions): HtmlGenerator;

  /**
   * Syntax error class (if thrown during parsing)
   */
  export class SyntaxError extends Error {
    constructor(message: string);
  }
}
