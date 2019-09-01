import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationConfigComponent } from './quotation-config.component';

describe('QuotationConfigComponent', () => {
  let component: QuotationConfigComponent;
  let fixture: ComponentFixture<QuotationConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
