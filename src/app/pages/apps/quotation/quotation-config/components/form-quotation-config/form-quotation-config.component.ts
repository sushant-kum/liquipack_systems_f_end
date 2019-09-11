import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

/* Config Imports */
import { Config } from 'src/app/configs/config';

/* Service Imports */
import { HelperService } from 'src/app/services/helper/helper.service';
import { RegexService } from 'src/app/services/regex/regex.service';
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { QuotationGeneralService } from '../../../services/quotation-general/quotation-general.service';
import { QuotationConfigGeneralService } from '../../services/quotation-config-general/quotation-config-general.service';
import { InputFilterService } from 'src/app/services/input-filter/input-filter.service';

/* Interface Imports */
import { QuotationConfigData } from 'src/app/interfaces/quotation-config-data';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { QuotationConfigComponent } from '../../quotation-config.component';

interface Mode {
  new_config: boolean;
  component_view_ready: boolean;
}

@Component({
  selector: 'app-form-quotation-config',
  templateUrl: './form-quotation-config.component.html',
  styleUrls: ['./form-quotation-config.component.scss']
})
export class FormQuotationConfigComponent implements OnInit, AfterViewInit {
  mode: Mode = {
    new_config: null,
    component_view_ready: false
  };

  quotation_config: QuotationConfigData;

  quotation_config_field_names: { [key: string]: string };
  quotation_config_field_types: { [key: string]: string };

  quotation_config_config_name_ctrl: FormControl;
  quotation_config_is_active_ctrl: FormControl;

  form_error: { [key: string]: string } = {};

  constructor(
    private _regex_service: RegexService,
    private _http_service: HttpTransactionsService,
    private _input_filter_service: InputFilterService,
    public quotation_gen_svc: QuotationGeneralService,
    public quotation_cconfig_gen_svc: QuotationConfigGeneralService,
    public config: Config,
    public helper: HelperService,
    public dialogRef: MatDialogRef<FormQuotationConfigComponent>,
    public regex_svc: RegexService,
    @Inject(MAT_DIALOG_DATA) private _orig_quotation_config: QuotationConfigData
  ) { }

  ngOnInit() {
    this.quotation_config_field_names = this.quotation_gen_svc.quotation_item_names;
    this.quotation_config_field_types = this.quotation_gen_svc.quotation_item_types;

    if (this._orig_quotation_config) {
      this.mode.new_config = false;
      this.quotation_config = this.helper.object.copy.deep(this._orig_quotation_config) as QuotationConfigData;
    } else {
      this.mode.new_config = true;
      this.quotation_config = this.helper.object.copy.deep(this.quotation_cconfig_gen_svc.empty_quotation_config) as QuotationConfigData;
    }
    this._populateFormFields();
  }

  ngAfterViewInit(): void {
    const inputs_price = document.querySelectorAll('.input-price');
    inputs_price.forEach(
      (input_price_ele: HTMLInputElement) => {
        this._input_filter_service.setInputFilter(input_price_ele, this.regex_svc.price);
      }
    );
    this.mode.component_view_ready = true;
  }

  private _populateFormFields(): void {
    this.quotation_config_config_name_ctrl = new FormControl(this.quotation_config.config_name, [
      Validators.required,
      Validators.pattern(this._regex_service.quotation_config_name)
    ]);
    this.quotation_config_is_active_ctrl = new FormControl(this.quotation_config.is_active);
    for (const field of Object.keys(this.quotation_gen_svc.quotation_item_names)) {
      this.form_error[field] = null;
    }
  }

  onRemoveOptionClick(field: string, option_index: number): void {
    if (this.quotation_config[field].options.length <= 1) {
      this.quotation_config[field].options = [{
        qty: null,
        price: null
      }];
      this.quotation_config[field].default_option_index = null;
    } else {
      this.quotation_config[field].options.splice(option_index, 1);
      if (this.quotation_config[field].default_option_index === option_index) {
        this.quotation_config[field].default_option_index = null;
      }
    }
  }

  onDefaultOptionSlidToggleChange(field: string, option_index: number, event: MatSlideToggleChange): void {
    if (event.checked === true) {
      this.quotation_config[field].default_option_index = option_index;
    } else {
      this.quotation_config[field].default_option_index = null;
    }
  }

  onAddOptionClick(field: string): void {
    this.quotation_config[field].options.push({
      qty: null,
      price: null
    });
  }

  isFormValid(): boolean {
    if (!this.mode.component_view_ready) {
      return false;
    }

    for (const key of Object.keys(this.form_error)) {
      this.form_error[key] = null;
    }

    if (this.quotation_config_config_name_ctrl.invalid) {
      return false;
    }

    for (const field of Object.keys(this.quotation_gen_svc.quotation_item_names)) {
      if (this.quotation_config[field].default_option_index > this.quotation_config[field].options.length) {
        this.form_error[field] = 'Invalid default option selection.';
        return false;
      }

      for (const option of this.quotation_config[field].options) {
        if (option.qty === '' || option.qty === null) {
          this.form_error[field] = `Invalid option quantity for option ${this.quotation_config[field].options.indexOf(option) + 1}.`;
          return false;
        }
      }
    }
    return true;
  }

  onCloseClick(): void {
    this.dialogRef.close({
      data: null,
      operation: 'close'
    });
  }

  onResetClick(): void {
    if (this.mode.new_config) {
      this.quotation_config = this.helper.object.copy.deep(this.quotation_cconfig_gen_svc.empty_quotation_config) as QuotationConfigData;
      this.quotation_config_config_name_ctrl.setValue(null);
      this.quotation_config_config_name_ctrl.setValue(false);
    } else {
      this.quotation_config = this.helper.object.copy.deep(this._orig_quotation_config) as QuotationConfigData;
    }
    this.isFormValid();
  }

  onAddClick(): void {
    this._http_service.get_quotations_configs.sendRequest().subscribe(
      (res: ApiResponse) => {
        let flag_non_unique_config_name = false;
        for (const config of res.data) {
          if (config.config_name === this.quotation_config_config_name_ctrl.value) {
            this.quotation_config_config_name_ctrl.setErrors({ notUnique: true });
            document.getElementById('input-config_name').focus();
            setTimeout(() => {
              this.quotation_config_config_name_ctrl.setErrors({ notUnique: false });
            }, 5000);
            flag_non_unique_config_name = true;
            break;
          }
        }

        if (!flag_non_unique_config_name) {
          this.quotation_config.config_name = this.quotation_config_config_name_ctrl.value;
          this.quotation_config.is_active = this.quotation_config_is_active_ctrl.value;

          this.dialogRef.close({
            data: this.quotation_config,
            operation: 'quotation-config.add'
          });
        }
      },
      (err: Error) => {
        console.error(err);
      }
    );
  }

  onSaveClick(): void {

  }
}
