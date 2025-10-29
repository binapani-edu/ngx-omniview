import { TestBed } from '@angular/core/testing';

import { NgxOmniviewService } from './ngx-omniview.service';

describe('NgxOmniviewService', () => {
  let service: NgxOmniviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxOmniviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
