import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

/* Config Imports */
import { Config } from "src/app/configs/config";

/* Service Imports */
import { HelperService } from "src/app/services/helper/helper.service";

/* Interface Imports */
import { QuotationData } from "src/app/interfaces/quotation-data";

interface IncomingData {
  quotation: QuotationData;
  meta: {
    quotaion_items_key_name_mapping: { [key: string]: string };
  };
}

@Component({
  selector: "app-view-quotation-modal",
  templateUrl: "./view-quotation-modal.component.html",
  styleUrls: ["./view-quotation-modal.component.scss"]
})
export class ViewQuotationModalComponent implements OnInit {
  quotation: QuotationData;
  quotation_items_key_name_mapping: { [key: string]: string };

  constructor(
    private _dialogRef: MatDialogRef<ViewQuotationModalComponent>,
    public helper: HelperService,
    @Inject(MAT_DIALOG_DATA) public data: IncomingData
  ) {}

  ngOnInit() {
    this.quotation = this.data.quotation;
    this.quotation_items_key_name_mapping = this.data.meta.quotaion_items_key_name_mapping;
  }

  onCloseClick(): void {
    this._dialogRef.close();
  }
}
