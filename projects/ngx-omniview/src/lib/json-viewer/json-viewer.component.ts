import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'json-viewer',
  imports: [CommonModule],
  templateUrl: './json-viewer.component.html',
  styleUrl: './json-viewer.component.css'
})
export class JsonViewerComponent {
  @Input() data: any = {};

  collapsed: Record<string, boolean> = {};

  get keys(): string[] {
    return this.data && typeof this.data === 'object' ? Object.keys(this.data) : [];
  }

  isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
  }

  toggle(key: string) {
    this.collapsed[key] = !this.collapsed[key];
  }

  formatValue(value: any): string {
    if (value === null) return 'null';
    if (typeof value === 'string') return `"${value}"`;
    return String(value);
  }

  getValueClass(value: any): string {
    if (value === null) return 'json-value-null';
    if (typeof value === 'string') return 'json-value-string';
    if (typeof value === 'number') return 'json-value-number';
    if (typeof value === 'boolean') return 'json-value-boolean';
    return '';
  }
}
