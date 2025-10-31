import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { OmniviewFormat, rendererRegistry } from './renderers';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { MathjaxModule } from 'mathjax-angular';

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
  imports: [CommonModule, MarkdownModule, JsonViewerComponent, MathjaxModule],
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
   * Get the rendered content based on the format
   * 
   * Uses the renderer registry to delegate to the appropriate renderer function.
   * For special formats (json, markdown), additional processing is done in the template.
   */
  get renderedContent(): string | any {
    if (!this.data) return '';

    // For JSON, parse and return object (used by json-viewer component)
    if (this.format === 'json') {
      try {
        return JSON.parse(this.data);
      } catch {
        return { error: 'Invalid JSON', raw: this.data };
      }
    }

    // For all other formats, use the renderer registry
    const renderer = rendererRegistry[this.format];
    return renderer ? renderer(this.data) : this.data;
  }
}
