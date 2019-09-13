import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormQuotationConfigComponent } from "./form-quotation-config.component";

describe("FormQuotationConfigComponent", () => {
  let component: FormQuotationConfigComponent;
  let fixture: ComponentFixture<FormQuotationConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormQuotationConfigComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormQuotationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
