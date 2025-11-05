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

let latexJsModule: any = null;
let latexJsInitPromise: Promise<void> | null = null;

export function registerLatexJsComponent(): Promise<void> {
  if (latexJsInitPromise) return latexJsInitPromise;
  latexJsInitPromise = (async () => {
    if (!customElements.get('latex-js')) {
      // @ts-ignore: dynamic CDN import, no types
      latexJsModule = await import('https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs');
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
