import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
import { HttpErrorResponse } from '@angular/common/http';
import { QuotationConfigData } from 'src/app/interfaces/quotation-config-data';

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

  quotation: QuotationData;
  quotation_config: QuotationConfigData;

  form_quotation_details: FormGroup = new FormGroup({
    quotation_num: new FormControl(null, [
      Validators.required,
      Validators.pattern(this._regex_service.quotation_num)
    ])
  });

  form_customer_details: FormGroup = new FormGroup({
    customer_name: new FormControl(null, [Validators.required]),
    person_of_contact_title: new FormControl(null, [Validators.required]),
    person_of_contact_name: new FormControl(null, [Validators.required]),
    contact_no: new FormControl(null, [
      Validators.required,
      Validators.pattern(this._regex_service.phone)
    ]),
    address: new FormControl(null, [Validators.required])
  });

  constructor(
    private _regex_service: RegexService,
    private _http_service: HttpTransactionsService,
    private _input_filter_service: InputFilterService,
    public quotation_gen_svc: QuotationGeneralService,
    public config: Config,
    public helper: HelperService,
    public dialogRef: MatDialogRef<FormQuotationComponent>,
    @Inject(MAT_DIALOG_DATA) private _orig_quotation: QuotationData
  ) {}

  ngOnInit() {
    if (this._orig_quotation) {
      this.mode.new_quotation = false;
      this.quotation = this.helper.object.copy.deep(
        this._orig_quotation
      ) as QuotationData;
    } else {
      this.mode.new_quotation = true;
      this.quotation = this.helper.object.copy.deep(
        this.quotation_gen_svc.empty_quotation
      ) as QuotationData;
    }
    this._getActiveQuotationConfig();
    this._populateFormFields();
  }

  private _getActiveQuotationConfig(): void {
    this._http_service.get_quotations_configs_active.sendRequest().subscribe(
      (res: ApiResponse) => {
        this.quotation_config = res.data;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
      }
    );
  }

  private _populateFormFields(): void {
    this.form_quotation_details
      .get('quotation_num')
      .setValue(this.quotation.quotation_num);

    this.form_customer_details
      .get('customer_name')
      .setValue(this.quotation.customer_details.name);
    this.form_customer_details
      .get('person_of_contact_title')
      .setValue(this.quotation.customer_details.person_of_contact.title);
    this.form_customer_details
      .get('person_of_contact_name')
      .setValue(this.quotation.customer_details.person_of_contact.name);
    this.form_customer_details
      .get('contact_no')
      .setValue(this.quotation.customer_details.contact_no);
    this.form_customer_details
      .get('address')
      .setValue(this.quotation.customer_details.address);
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
