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
});
