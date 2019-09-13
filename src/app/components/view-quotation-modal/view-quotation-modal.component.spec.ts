import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ViewQuotationModalComponent } from "./view-quotation-modal.component";

describe("ViewQuotationModalComponent", () => {
  let component: ViewQuotationModalComponent;
  let fixture: ComponentFixture<ViewQuotationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuotationModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuotationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
