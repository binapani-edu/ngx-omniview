import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent implements OnInit {
  @Input() data: any = {};
  @Input() level: number = 0;
  @Input() showCounts: boolean = true;

  collapsed: Record<string, boolean> = {};
  private static readonly ROOT_KEY = '__root__';

  ngOnInit() {
    // Collapse all expandable items on initial load
    this.keys.forEach(key => {
      if (this.isObject(this.data[key])) {
        this.collapsed[key] = true;
      }
    });
    // Root starts collapsed
    if (this.level === 0) {
      this.collapsed[JsonViewerComponent.ROOT_KEY] = true;
    }
  }

  get keys(): string[] {
    return this.data && typeof this.data === 'object' ? Object.keys(this.data) : [];
  }

  get isArray(): boolean {
    return Array.isArray(this.data);
  }

  // Keys used for rendering: for root, render a synthetic key
  get renderKeys(): string[] {
    if (this.level === 0) return [JsonViewerComponent.ROOT_KEY];
    return this.keys;
  }

  getValueByKey(key: string): any {
    if (key === JsonViewerComponent.ROOT_KEY) return this.data;
    return this.data[key];
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
  }

  toggle(key: string) {
    this.collapsed[key] = !this.collapsed[key];
  }

  getSize(value: any): number {
    if (Array.isArray(value)) return value.length;
    if (typeof value === 'object' && value !== null) return Object.keys(value).length;
    return 0;
  }

  formatValue(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
  }

  getValueClass(value: any): string {
    if (value === null) return 'json-value-null';
    if (value === undefined) return 'json-value-undefined';
    if (typeof value === 'string') return 'json-value-string';
    if (typeof value === 'number') return 'json-value-number';
    if (typeof value === 'boolean') return 'json-value-boolean';
    return '';
  }

  getBracket(value: any, opening: boolean): string {
    const isArr = Array.isArray(value);
    return opening ? (isArr ? '[' : '{') : (isArr ? ']' : '}');
  }

  isArrayValue(value: any): boolean {
    return Array.isArray(value);
  }

  getCountLabel(value: any): string {
    const count = this.getSize(value);
    const base = this.isArrayValue(value) ? 'item' : 'prop';
    return `${count} ${base}${count === 1 ? '' : 's'}`;
  }
}
