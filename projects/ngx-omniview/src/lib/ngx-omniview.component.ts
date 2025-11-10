import { Component, Input, OnDestroy } from '@angular/core';
import { OmniviewFormat, rendererRegistry } from './renderers';

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
  templateUrl: './ngx-omniview.component.html',
  styleUrls: ['./ngx-omniview.component.css']
})
export class NgxOmniviewComponent implements OnDestroy {
  /**
   * The raw string content to be rendered (internal data storage)
   * @private
   */
  private _data: string = '';

  /**
   * The format/type of the content (internal format storage)
   * @default 'text'
   */
  private _format: OmniviewFormat = 'text';

  /**
   * Cached rendered content to avoid re-rendering on every change detection
   * @private
   */
  private _cachedContent: string | any = '';

  /**
   * The raw string content to be rendered
   * Using setter pattern for efficient change detection
   */
  @Input()
  set data(value: string) {
    if (this._data !== value) {
      this._data = value;
      this._invalidateCache();
    }
  }
  get data(): string {
    return this._data;
  }

  /**
   * The format/type of the content
   * @default 'text'
   */
  @Input()
  set format(value: OmniviewFormat) {
    if (this._format !== value) {
      this._format = value;
      this._invalidateCache();
    }
  }
  get format(): OmniviewFormat {
    return this._format;
  }

  /**
   * Invalidate cache and trigger re-render
   * @private
   */
  private _invalidateCache(): void {
    this._cachedContent = this._renderContent();
  }

  /**
   * Render content based on format
   * @private
   */
  private _renderContent(): string | any {
    if (!this._data) {
      return '';
    }

    // For JSON, parse and return object (used by json-viewer component)
    if (this._format === 'json') {
      try {
        return JSON.parse(this._data);
      } catch {
        return { error: 'Invalid JSON', raw: this._data };
      }
    }

    // For all other formats, use the renderer registry
    const renderer = rendererRegistry[this._format];
    return renderer ? renderer(this._data) : this._data;
  }

  /**
   * Get the rendered content
   * 
   * For performance optimization, returns cached content, only re-renders when inputs change
   */
  get renderedContent(): string | any {
    return this._cachedContent;
  }

  /**
   * For LaTeX, check if the rendered content is an error HTML
   */
  get isLatexError(): boolean {
    if (this.format !== 'latex') return false;
    const content = this.renderedContent;
    return typeof content === 'string' && content.trim().startsWith('<div class="latex-error">');
  }

  ngOnDestroy(): void {
    // Clear cached content to free memory
    this._cachedContent = '';
    this._data = '';
  }

}
