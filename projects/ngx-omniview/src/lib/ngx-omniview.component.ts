import { Component, Input } from '@angular/core';
import { OmniviewFormat, rendererRegistry } from './renderers';

/**
 * OmniviewComponent - Universal content renderer
 * 
 * Renders raw string data in various formats including text, HTML, Markdown,
 * LaTeX, MathJax, JSON, and syntax-highlighted code.
 * 
 * Each format has its own dedicated renderer implementation in the `renderers/` folder.
 * 
 * @example
 * ```html
 * <omniview [data]="content" [format]="'markdown'"></omniview>
 * ```
 */
@Component({
  selector: 'omniview',
  imports: [],
  template: `
    <div class="omniview-content">
      {{ renderedContent }}
    </div>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .omniview-content {
      width: 100%;
      height: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `
})
export class NgxOmniviewComponent {
  /**
   * The raw string content to be rendered
   */
  @Input() data: string = '';

  /**
   * The format/type of the content
   * @default 'text'
   */
  @Input() format: OmniviewFormat = 'text';

  /**
   * Get the rendered content based on the format
   * 
   * Uses the renderer registry to delegate to the appropriate renderer function.
   */
  get renderedContent(): string {
    if (!this.data) {
      return '';
    }

    // Get the appropriate renderer from the registry
    const renderer = rendererRegistry[this.format];
    
    if (!renderer) {
      // Fallback if format is not recognized
      return this.data;
    }

    return renderer(this.data);
  }
}
