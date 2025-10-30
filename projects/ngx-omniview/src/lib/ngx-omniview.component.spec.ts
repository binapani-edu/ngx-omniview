import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOmniviewComponent } from './ngx-omniview.component';

describe('NgxOmniviewComponent', () => {
  let component: NgxOmniviewComponent;
  let fixture: ComponentFixture<NgxOmniviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxOmniviewComponent]
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
});
