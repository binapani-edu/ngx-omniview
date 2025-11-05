function injectKatexCss() {
  const href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    console.info('[ngx-omniview] KaTeX CSS injected');
  }
}

/**
 * Type aliases based on src/types/latex.js.d.ts
 * Defined locally to avoid TypeScript trying to resolve npm package
 * These provide type safety while using CDN imports
 */
interface LatexJsHtmlGenerator {
  reset(): void;
  htmlDocument(baseURL?: string): HTMLDocument;
  domFragment(): DocumentFragment;
  stylesAndScripts(baseURL?: string): DocumentFragment;
  applyLengthsAndGeometryToDom(el: HTMLElement): void;
  documentTitle(): string;
}
interface LatexJsParseOptions {
  generator: LatexJsHtmlGenerator;
}
interface LatexJsHtmlGeneratorOptions {
  documentClass?: string;
  CustomMacros?: any;
  hyphenate?: boolean;
  languagePatterns?: any;
  styles?: string[];
}

/**
 * Type for the latex.js module loaded from CDN
 * Contains the exports we need: parse, HtmlGenerator, and LaTeXJSComponent
 * 
 * Types are based on src/types/latex.js.d.ts (automatically included by tsconfig)
 */
interface LatexJsModule {
  parse: (latex: string, options: LatexJsParseOptions) => LatexJsHtmlGenerator;
  HtmlGenerator: new (options?: LatexJsHtmlGeneratorOptions) => LatexJsHtmlGenerator;
  LaTeXJSComponent: CustomElementConstructor;
}

let latexJsModule: LatexJsModule | null = null;
let latexJsInitPromise: Promise<void> | null = null;

export function registerLatexJsComponent(): Promise<void> {
  if (latexJsInitPromise) return latexJsInitPromise;
  latexJsInitPromise = (async () => {
    if (!customElements.get('latex-js')) {
      // LaTeX.js dynamic CDN import - TypeScript can't type URL imports, so we use type assertion
      // The types from src/types/latex.js.d.ts provide type safety for the module contents
      // @ts-expect-error - Dynamic import from CDN URL (not a TypeScript module path)
      latexJsModule = await import('https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs') as LatexJsModule;
      customElements.define('latex-js', latexJsModule.LaTeXJSComponent);
      console.info('[ngx-omniview] latex-js registered');
    }
    injectKatexCss();
  })();
  return latexJsInitPromise;
}

/**
 * Validate LaTeX by attempting to parse it
 * Returns null if valid, error message if invalid
 */
export function validateLatex(latex: string): string | null {
  if (!latexJsModule) {
    // Module not loaded yet!
    // skip validation (will be validated by component)
    return null;
  }

  try {
    const { parse, HtmlGenerator } = latexJsModule;
    const generator = new HtmlGenerator({ hyphenate: true });
    generator.reset();
    parse(latex, { generator });
    return null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return errorMessage;
  }
}
