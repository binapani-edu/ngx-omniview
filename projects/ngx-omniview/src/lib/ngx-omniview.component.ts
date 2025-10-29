import { Component, Input } from '@angular/core';

/**
 * Supported content formats for rendering
 */
export type OmniviewFormat = 
  | 'text' 
  | 'html' 
  | 'markdown' 
  | 'latex' 
  | 'mathjax' 
  | 'json' 
  | 'code';

/**
 * OmniviewComponent - Universal content renderer
 * 
 * Renders raw string data in various formats including text, HTML, Markdown,
 * LaTeX, MathJax, JSON, and syntax-highlighted code.
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
   */
  get renderedContent(): string {
    if (!this.data) {
      return '';
    }

    switch (this.format) {
      case 'text':
        return this.renderText();
      
      // TODO: Add more renderers
      case 'html':
      case 'markdown':
      case 'latex':
      case 'mathjax':
      case 'json':
      case 'code':
        return `[${this.format} rendering - coming soon]\n\n${this.data}`;
      
      default:
        return this.data;
    }
  }

  /**
   * Render plain text (simplest renderer)
   */
  private renderText(): string {
    return this.data;
  }
}
