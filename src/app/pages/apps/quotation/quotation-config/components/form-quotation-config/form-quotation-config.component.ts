import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* Config Imports */
import { Config } from 'src/app/configs/config';

/* Service Imports */
import { HelperService } from 'src/app/services/helper/helper.service';
import { RegexService } from 'src/app/services/regex/regex.service';
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { QuotationGeneralService } from '../../../services/quotation-general/quotation-general.service';
import { QuotationConfigGeneralService } from '../../services/quotation-config-general/quotation-config-general.service';

/* Interface Imports */
import { QuotationConfigData } from 'src/app/interfaces/quotation-config-data';

interface Mode {
  new_config: boolean;
}

@Component({
  selector: 'app-form-quotation-config',
  templateUrl: './form-quotation-config.component.html',
  styleUrls: ['./form-quotation-config.component.scss']
})
export class FormQuotationConfigComponent implements OnInit {
  mode: Mode = {
    new_config: null
  };

  quotation_config_field_names: {[key: string]: string};
  quotation_config_field_types: {[key: string]: string};

  quotation_config_config_name_ctrl: FormControl;
  quotation_config_is_active_ctrl: FormControl;

  constructor(
    private _regex_service: RegexService,
    private _http_service: HttpTransactionsService,
    public quotation_gen_svc: QuotationGeneralService,
    public quotation_cconfig_gen_svc: QuotationConfigGeneralService,
    public config: Config,
    public helper: HelperService,
    public dialogRef: MatDialogRef<FormQuotationConfigComponent>,
    public regex_svc: RegexService,
    @Inject(MAT_DIALOG_DATA) public quotation_config: QuotationConfigData
  ) { }

  ngOnInit() {
    this.quotation_config_field_names = this.quotation_gen_svc.quotation_item_names;
    this.quotation_config_field_types = this.quotation_gen_svc.quotation_item_types;

    if (this.quotation_config) {
      this.mode.new_config = false;
    } else {
      this.mode.new_config = true;
      this.quotation_config = this.quotation_cconfig_gen_svc.empty_quotation_config;
    }
    this._populateFormFields();
  }

  private _populateFormFields(): void {
    this.quotation_config_config_name_ctrl = new FormControl(this.quotation_config.config_name, [
      Validators.required,
      Validators.pattern(this._regex_service.quotation_config_name)
    ]);
    this.quotation_config_is_active_ctrl = new FormControl(this.quotation_config.is_active);
  }

  onCloseClick(): void {
    this.dialogRef.close({
      data: null,
      operation: 'close'
    });
  }
}
