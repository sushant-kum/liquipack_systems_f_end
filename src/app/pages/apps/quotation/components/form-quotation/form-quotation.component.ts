import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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

interface Mapping {
  quotation_item_names: { [key: string]: string };
  quotation_item_types: { [key: string]: string };
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
  non_option_question = {
    start: 'Add option <b>',
    end: '</b>.'
  };

  mapping: Mapping;

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

  form_quotation_items: FormGroup;

  constructor(
    private _regex_service: RegexService,
    private _http_service: HttpTransactionsService,
    private _quotation_gen_svc: QuotationGeneralService,
    public helper: HelperService,
    public dialogRef: MatDialogRef<FormQuotationComponent>,
    @Inject(MAT_DIALOG_DATA) private _orig_quotation: QuotationData
  ) {}

  ngOnInit() {
    this.mapping = {
      quotation_item_names: this._quotation_gen_svc.quotation_item_names,
      quotation_item_types: this._quotation_gen_svc.quotation_item_types
    };

    const form_grp_quotation_items_ctrls = {};
    for (const item of this.helper.object.Keys(
      this.mapping.quotation_item_names
    )) {
      form_grp_quotation_items_ctrls[`${item}_qty`] = new FormControl(
        null,
        this.mapping.quotation_item_types[item] === 'number'
          ? [Validators.required, Validators.pattern(this._regex_service.price)]
          : [Validators.required]
      );
      form_grp_quotation_items_ctrls[`${item}_price`] = new FormControl(null, [
        Validators.pattern(this._regex_service.price)
      ]);
    }
    this.form_quotation_items = new FormGroup(form_grp_quotation_items_ctrls);

    if (this._orig_quotation) {
      this.mode.new_quotation = false;
      this.quotation = this.helper.object.copy.deep(
        this._orig_quotation
      ) as QuotationData;
    } else {
      this.mode.new_quotation = true;
      this.quotation = this.helper.object.copy.deep(
        this._quotation_gen_svc.empty_quotation
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

    for (const item of this.helper.object.Keys(
      this.mapping.quotation_item_names
    )) {
      this.form_quotation_items
        .get(`${item}_qty`)
        .setValue(this.quotation[item].qty);
      this.form_quotation_items
        .get(`${item}_price`)
        .setValue(this.quotation[item].price);
    }
  }

  qtyOptionSelected(
    quotation_item: string,
    event: MatAutocompleteSelectedEvent
  ) {
    const option = event.option;
    if (option.value.toString().indexOf(this.non_option_question.start) === 0) {
      const new_option = option.value
        .substring(this.non_option_question.start.length)
        .split(this.non_option_question.end)[0];
      this.form_quotation_items
        .get(`${quotation_item}_qty`)
        .setValue(new_option);
    }
    this.qtyChanged(quotation_item);
  }

  filteredQtyOptions(quotation_item: string) {
    if (this.quotation_config) {
      const qty_array: string[] = [];
      for (const option of this.quotation_config[quotation_item].options) {
        qty_array.push(option.qty);
      }

      let results = qty_array.filter((qty: string) => {
        if (this.mapping.quotation_item_types[quotation_item] === 'string') {
          return (
            qty
              .toLowerCase()
              .indexOf(
                this.form_quotation_items.get(`${quotation_item}_qty`).value
                  ? this.form_quotation_items
                      .get(`${quotation_item}_qty`)
                      .value.toLowerCase()
                  : ''
              ) >= 0
          );
        } else {
          return (
            qty
              .toString()
              .toLowerCase()
              .indexOf(
                this.form_quotation_items.get(`${quotation_item}_qty`).value
                  ? this.form_quotation_items
                      .get(`${quotation_item}_qty`)
                      .value.toString()
                      .toLowerCase()
                  : ''
              ) >= 0
          );
        }
      });

      if (results.length < 1) {
        results = [
          this.non_option_question.start +
            this.form_quotation_items.get(`${quotation_item}_qty`).value +
            this.non_option_question.end
        ];
      }

      return results;
    }
    return [];
  }

  qtyChanged(quotation_item: string) {
    const value = this.form_quotation_items.get(`${quotation_item}_qty`).value;
    for (const option of this.quotation_config[quotation_item].options) {
      console.log(option, option.qty.toString(), value);
      // tslint:disable-next-line: triple-equals
      if (option.qty == value) {
        this.form_quotation_items
          .get(`${quotation_item}_price`)
          .setValue(option.price);
        break;
      }
    }
  }

  isFormValid(): boolean {
    return true;
  }

  onResetConfigPricesClick(): void {
    for (const item of this.helper.object.Keys(
      this._quotation_gen_svc.quotation_item_names
    )) {
      console.log('item', item);
      for (const option of this.quotation_config[item].options) {
        console.log('option', option);
        if (
          option.qty.toString() ===
          this.form_quotation_items.get(`${item}_qty`).value.toString()
        ) {
          console.log('this.quotation[item].price = option.price');
          this.form_quotation_items.get(`${item}_price`).setValue(option.price);
          break;
        }
      }
    }
  }

  onResetClick(): void {
    if (this.mode.new_quotation) {
      this.quotation = this.helper.object.copy.deep(
        this._quotation_gen_svc.empty_quotation
      ) as QuotationData;
    } else {
      this.quotation = this.helper.object.copy.deep(
        this._orig_quotation
      ) as QuotationData;
    }
  }

  onCloseClick(): void {
    this.dialogRef.close({
      data: null,
      operation: 'close'
    });
  }
}
