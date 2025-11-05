import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { OmniviewFormat, rendererRegistry, registerLatexJsComponent } from './renderers';
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
  styleUrl: './ngx-omniview.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NgxOmniviewComponent implements OnInit {
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

  /**
   * For LaTeX, check if the rendered content is an error HTML
   */
  get isLatexError(): boolean {
    if (this.format !== 'latex') return false;
    const content = this.renderedContent;
    return typeof content === 'string' && content.trim().startsWith('<div class="latex-error">');
  }

  async ngOnInit() {
    await registerLatexJsComponent();
  }

}
