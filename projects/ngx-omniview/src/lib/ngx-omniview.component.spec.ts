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
});
