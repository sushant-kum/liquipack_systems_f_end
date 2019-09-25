import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

/* Config Imports */
import { Config } from 'src/app/configs/config';

/* Service Imports */
import { HelperService } from 'src/app/services/helper/helper.service';
import { RegexService } from 'src/app/services/regex/regex.service';
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { QuotationGeneralService } from '../../services/quotation-general/quotation-general.service';
import { InputFilterService } from 'src/app/services/input-filter/input-filter.service';

/* Interface Imports */
import { QuotationData } from 'src/app/interfaces/quotation-data';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { DialogResponse } from 'src/app/interfaces/dialog-response';

interface Mode {
  new_quotation: boolean;
}

@Component({
  selector: 'app-form-quotation',
  templateUrl: './form-quotation.component.html',
  styleUrls: ['./form-quotation.component.scss']
})
export class FormQuotationComponent implements OnInit {
  mode: Mode = {
    new_quotation: null
  };

  constructor(
    private _regex_service: RegexService,
    private _http_service: HttpTransactionsService,
    private _input_filter_service: InputFilterService,
    public quotation_gen_svc: QuotationGeneralService,
    public config: Config,
    public helper: HelperService,
    public dialogRef: MatDialogRef<FormQuotationComponent>,
    public regex_svc: RegexService,
    @Inject(MAT_DIALOG_DATA) public quotation: QuotationData
  ) {}

  ngOnInit() {
    if (this.quotation) {
      this.mode.new_quotation = false;
    } else {
      this.mode.new_quotation = true;
    }
  }

  private _populateFormFields(): void {
    // this.quotation_config_config_name_ctrl = new FormControl(
    //   this.quotation_config.config_name,
    //   [
    //     Validators.required,
    //     Validators.pattern(this._regex_service.quotation_config_name)
    //   ]
    // );
    // this.quotation_config_is_active_ctrl = new FormControl(
    //   this.quotation_config.is_active
    // );
    // for (const field of Object.keys(
    //   this.quotation_gen_svc.quotation_item_names
    // )) {
    //   this.form_error[field] = null;
    // }
  }

  isFormValid(): boolean {
    return true;
  }

  onCloseClick(): void {
    this.dialogRef.close({
      data: null,
      operation: 'close'
    });
  }
}
