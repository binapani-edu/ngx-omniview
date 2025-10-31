import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, importProvidersFrom } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { MathjaxModule } from 'mathjax-angular';

import { NgxOmniviewComponent } from './ngx-omniview.component';

describe('NgxOmniviewComponent', () => {
  let component: NgxOmniviewComponent;
  let fixture: ComponentFixture<NgxOmniviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxOmniviewComponent],
      providers: [
        importProvidersFrom(
          MarkdownModule.forRoot(),
          MathjaxModule.forRoot()
        )
      ],
      // allow unknown elements from external modules (markdown, mathjax, json-viewer)
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxOmniviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default format as text', () => {
    expect(component.format).toBe('text');
  });

  it('should render text content', () => {
    component.data = 'Hello World';
    component.format = 'text';
    expect(component.renderedContent).toBe('Hello World');
  });

  it('should return empty string for empty data', () => {
    component.data = '';
    expect(component.renderedContent).toBe('');
  });

  it('should render HTML content', () => {
    component.data = '<h1>Title</h1><p>Paragraph</p>';
    component.format = 'html';
    expect(component.renderedContent).toBe('<h1>Title</h1><p>Paragraph</p>');
  });

  it('should parse JSON content', () => {
    component.data = '{"name":"test","value":123}';
    component.format = 'json';
    const result = component.renderedContent;
    expect(result).toEqual({ name: 'test', value: 123 });
  });

  it('should handle invalid JSON', () => {
    component.data = '{invalid json}';
    component.format = 'json';
    const result = component.renderedContent;
    expect(result.error).toBe('Invalid JSON');
  });

  it('should render markdown content', () => {
    component.data = '# Hello World';
    component.format = 'markdown';
    expect(component.renderedContent).toBe('# Hello World');
  });

  it('should render MathJax content', () => {
    component.data = '$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$';
    component.format = 'mathjax';
    expect(component.renderedContent).toBe('$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$');
  });

  it('should use registry for MathJax format', () => {
    component.data = 'Euler\'s Identity: $$e^{i\\pi} + 1 = 0$$';
    component.format = 'mathjax';
    const result = component.renderedContent;
    expect(typeof result).toBe('string');
    expect(result).toContain('Euler');
  });

  it('should handle inline math syntax in MathJax', () => {
    component.data = 'The quadratic formula is $x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$';
    component.format = 'mathjax';
    const result = component.renderedContent;
    expect(result).toBe(component.data);
    expect(result).toContain('$x =');
  });

  it('should handle block math syntax in MathJax', () => {
    component.data = 'Euler\'s Identity:\n$$e^{i\\pi} + 1 = 0$$';
    component.format = 'mathjax';
    const result = component.renderedContent;
    expect(result).toBe(component.data);
    expect(result).toContain('$$');
  });

  it('should handle empty string in MathJax', () => {
    component.data = '';
    component.format = 'mathjax';
    const result = component.renderedContent;
    expect(result).toBe('');
  });

  it('should handle complex LaTeX expressions in MathJax', () => {
    component.data = 'Integral: $\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$';
    component.format = 'mathjax';
    const result = component.renderedContent;
    expect(result).toBe(component.data);
    expect(result).toContain('\\int');
  });

  it('should handle unknown format gracefully', () => {
    component.data = 'Some content';
    component.format = 'unknown' as any;
    // Should return raw data when format is not recognized
    expect(component.renderedContent).toBe('Some content');
  });

  it('should handle placeholder formats', () => {
    component.data = 'LaTeX content';
    component.format = 'latex';
    const result = component.renderedContent;
    expect(result).toContain('[latex rendering - coming soon]');
    expect(result).toContain('LaTeX content');
  });
});
