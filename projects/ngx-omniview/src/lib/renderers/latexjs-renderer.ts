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

export async function registerLatexJsComponent() {
  if (customElements.get('latex-js')) {
    injectKatexCss();
    return;
  }

  try {
    // @ts-ignore: dynamic CDN import, no types
    const module = await import('https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs');
    const LaTeXJSComponent = module.LaTeXJSComponent;
    customElements.define('latex-js', LaTeXJSComponent);

    const css = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
    if (!document.querySelector(`link[href="${css}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = css;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }

    console.info('[ngx-omniview] latex-js web component registered');
  } catch (err) {
    console.error('Failed to load latex.js:', err);
  }
}

