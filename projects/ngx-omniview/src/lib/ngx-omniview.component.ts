import { Component, Input } from '@angular/core';
import { OmniviewFormat, rendererRegistry } from './renderers';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { renderHtml } from './renderers/html.renderer';
import { renderMarkdown } from './renderers/markdown.renderer';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';

/**
 * OmniviewComponent - Universal content renderer
 * 
 * Renders raw string data in various formats including text, HTML, Markdown,
 * LaTeX, MathJax, JSON, and syntax-highlighted code.
 * 
 * Each format has its own dedicated renderer implementation in the `renderers/` folder.
 * 
 * Compatible with Angular 15-20.
 * 
 * @example
 * ```html
 * <omniview [data]="content" [format]="'markdown'"></omniview>
 * ```
 */
@Component({
  selector: 'omniview',
  imports: [CommonModule, MarkdownModule, JsonViewerComponent],
  templateUrl: './ngx-omniview.component.html',
  styleUrl: './ngx-omniview.component.css'
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
   * Determine if the current format requires innerHTML binding
   * (for formats that output HTML like 'html' and 'markdown')
   */
  get usesInnerHTML(): boolean {
    return this.format === 'html';
  }

  /**
   * Get the rendered content based on the format
   * 
   * Uses the renderer registry to delegate to the appropriate renderer function.
   */
  get renderedContent(): string {
    if (!this.data) return '';

    if (this.format === 'html') return renderHtml(this.data);
    if (this.format === 'markdown') return renderMarkdown(this.data);

    if (this.format === 'json') {
      try {
        return JSON.parse(this.data);
      } catch {
        return 'Invalid JSON';
      }
    }

    const renderer = rendererRegistry[this.format];
    return renderer ? renderer(this.data) : this.data;
  }
}
