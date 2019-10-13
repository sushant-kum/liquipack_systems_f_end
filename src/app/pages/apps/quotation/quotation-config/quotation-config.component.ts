import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/* Component Imports */
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { HeaderService } from 'src/app/services/header/header.service';
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';
import { ConfirmService } from 'src/app/services/confirm/confirm.service';

/* Config Imports */
import { Config } from 'src/app/configs/config';

/* Interface Imports */
import { QuotationConfigData } from 'src/app/interfaces/quotation-config-data';
import { DialogResponse } from 'src/app/interfaces/dialog-response';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { FormQuotationConfigComponent } from './components/form-quotation-config/form-quotation-config.component';

interface Mode {
  fetching_configs: boolean;
  editing_config_ids: string[];
  adding_config: boolean;
}

const PAGE_ID = 'apps-quotation-config';
const QUOTAION_ITEM_NAMES = {
  speed: 'Speed in BPM',
  no_of_washes: 'Number of Washes',
  industry: 'Industry',
  gmp_requirement: 'GMP Requirment (contact part-S.S.316)',
  bottle_moc: 'Bottle MOC',
  water_saving: 'Water Saving',
  filters_required: 'Filters Required',
  illumination_required: 'Illumination Required',
  auto_level_tank: 'Auto Level Control in Tank',
  extra_cups_sets: 'Extra Set of Cups Required'
};

@Component({
  selector: 'app-config',
  templateUrl: './quotation-config.component.html',
  styleUrls: ['./quotation-config.component.scss']
})
export class QuotationConfigComponent implements OnInit, OnDestroy {
  private _page_id = PAGE_ID;
  config: Config = new Config();

  private _auth_state_change_subscription: Subscription;

  mode: Mode = {
    fetching_configs: false,
    editing_config_ids: [],
    adding_config: false
  };
  app_permission: ('read' | 'write')[] = [];

  quotation_item_names: { [key: string]: string } = QUOTAION_ITEM_NAMES;
  quotation_configs: QuotationConfigData[];

  constructor(
    private _title: Title,
    private _toast: MatSnackBar,
    private _header_service: HeaderService,
    private _sidebar: SidebarComponent,
    private _http_service: HttpTransactionsService,
    private _localstorage_service: LocalStorageService,
    private _auth_service: AuthService,
    private _dialog: MatDialog,
    private _confirm_service: ConfirmService,
    public helper_service: HelperService
  ) {}

  ngOnInit() {
    this._title.setTitle(this.config.page_map[this._page_id].name + ' - ' + this.config.app_title);
    this._header_service.changePageInfo(
      this.config.page_map[this._page_id].identifier,
      this.config.page_map[this._page_id].name,
      this.config.page_map[this._page_id].fas_icon
    );

    this._sidebar.activate();
    this._sidebar.colorize(this.config.page_map[this._page_id].identifier);

    this._auth_state_change_subscription = this._auth_service.auth_state_change.subscribe((auth_state: boolean) => {
      if (auth_state) {
        this.getQuotationConfigs();
        const app_permissions = JSON.parse(
          this._localstorage_service.get(this._localstorage_service.lsname.app_permissions)
        );
        for (const app of app_permissions) {
          if (app.app === this._page_id) {
            this.app_permission = app.permissions;
            break;
          }
        }
        if (!this.app_permission.includes('read')) {
          alert('You are not allowed here');
          this._sidebar.logout();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._auth_state_change_subscription.unsubscribe();
  }

  getQuotationConfigs(): void {
    this.quotation_configs = [];
    this.mode.fetching_configs = true;
    this._http_service.get_quotations_configs.sendRequest().subscribe(
      (quotation_config_res: ApiResponse) => {
        this._http_service.get_users_min.sendRequest().subscribe(
          (users_res: ApiResponse) => {
            for (const config of quotation_config_res.data) {
              delete config.__v;
              config.created_date = new Date(config.created_date);

              for (const user of users_res.data) {
                if (config.created_by === user._id) {
                  config.extra_data = {
                    creator: {
                      username: user.username,
                      name: user.name
                    }
                  };
                  break;
                }
              }

              this.quotation_configs.push(config);
            }

            this.mode.fetching_configs = false;
          },
          (users_err: Error) => {
            console.error(users_err);
            this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
          }
        );
      },
      (quotation_config_err: Error) => {
        console.error(quotation_config_err);
        this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
        this.mode.fetching_configs = false;
      }
    );
  }

  deleteQuotationConfig(quotation_config: QuotationConfigData): void {
    const confirm_sub = this._confirm_service
      .confirm({
        title: 'Confirm Delete Quotation Config',
        message: `Are you sure you want to delete Quotation Config <b>${quotation_config.config_name}</b> permanently?`,
        info: 'All data related to the config will be deleted. This operation cannot be undone.',
        positive_btn_text: 'Yes',
        negative_btn_text: 'No'
      })
      .subscribe((confirm_resp: DialogResponse) => {
        if (confirm_resp && confirm_resp.operation === 'confirm.ok') {
          this.mode.editing_config_ids.push(quotation_config._id);
          this._http_service.delete_quotations_configs_config_id.sendRequest(quotation_config._id).subscribe(
            (res: ApiResponse) => {
              for (const config of this.quotation_configs) {
                if (config._id === quotation_config._id) {
                  this.quotation_configs.splice(this.quotation_configs.indexOf(config), 1);
                  break;
                }
              }
              this.showToast('Quotation config deleted permanently successfully', 'OK', 3000, false);
              if (this.mode.editing_config_ids.includes(quotation_config._id)) {
                this.mode.editing_config_ids.splice(this.mode.editing_config_ids.indexOf(quotation_config._id), 1);
              }
            },
            (err: Error) => {
              console.error(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_config_ids.includes(quotation_config._id)) {
                this.mode.editing_config_ids.splice(this.mode.editing_config_ids.indexOf(quotation_config._id), 1);
              }
            }
          );
        }
        confirm_sub.unsubscribe();
      });
  }

  makeDefaultQuotationConfig(quotation_config: QuotationConfigData): void {
    const confirm_sub = this._confirm_service
      .confirm({
        title: 'Confirm Defaukt Quotation Config',
        message: `Are you sure you want to make Quotation Config <b>${quotation_config.config_name}</b> default config?`,
        positive_btn_text: 'Yes',
        negative_btn_text: 'No'
      })
      .subscribe((confirm_resp: DialogResponse) => {
        if (confirm_resp && confirm_resp.operation === 'confirm.ok') {
          this.mode.fetching_configs = true;
          this._http_service.patch_quotations_configs_config_id_enable.sendRequest(quotation_config._id).subscribe(
            (res: ApiResponse) => {
              for (const config of this.quotation_configs) {
                if (config._id === quotation_config._id) {
                  config.is_active = true;
                } else {
                  config.is_active = false;
                }
              }
              this.mode.fetching_configs = false;
            },
            (err: Error) => {
              console.error(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              this.mode.fetching_configs = false;
            }
          );
        }
        confirm_sub.unsubscribe();
      });
  }

  editQuotationConfig(config: QuotationConfigData): void {
    const dialog_ref = this._dialog.open(FormQuotationConfigComponent, {
      autoFocus: false,
      data: config
    });

    dialog_ref.afterClosed().subscribe((dialog_response: DialogResponse) => {
      if (dialog_response && dialog_response.operation === 'quotation-config.edit') {
        this.mode.editing_config_ids.push(dialog_response.data._id);
        this._http_service.put_quotations_configs_config_id
          .sendRequest(dialog_response.data._id, dialog_response.data)
          .subscribe(
            (res: ApiResponse) => {
              for (const quotation_config of this.quotation_configs) {
                if (quotation_config._id === res.data._id) {
                  const extra_data = quotation_config.extra_data;
                  const quotation_config_index = this.quotation_configs.indexOf(quotation_config);
                  this.quotation_configs[quotation_config_index] = this.helper_service.object.copy.deep(
                    res.data
                  ) as QuotationConfigData;
                  this.quotation_configs[quotation_config_index].extra_data = extra_data;
                }
              }
              this.showToast(`Quotation Config ${res.data.config_name} edited successfully.`, 'OK', 3000, false);
              if (this.mode.editing_config_ids.includes(dialog_response.data._id)) {
                this.mode.editing_config_ids.splice(this.mode.editing_config_ids.indexOf(dialog_response.data._id), 1);
              }
            },
            (err: Error) => {
              console.error(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_config_ids.includes(dialog_response.data._id)) {
                this.mode.editing_config_ids.splice(this.mode.editing_config_ids.indexOf(dialog_response.data._id), 1);
              }
            }
          );
      }
    });
  }

  addQuotationConfig(): void {
    const dialog_ref = this._dialog.open(FormQuotationConfigComponent, {
      autoFocus: false,
      data: null
    });

    dialog_ref.afterClosed().subscribe((dialog_response: DialogResponse) => {
      if (dialog_response && dialog_response.operation === 'quotation-config.add') {
        this.mode.adding_config = true;

        const flag_make_default: boolean = dialog_response.data.is_active;
        this._http_service.post_quotations_configs.sendRequest(dialog_response.data).subscribe(
          (res_add_config: ApiResponse) => {
            if (flag_make_default) {
              this._http_service.patch_quotations_configs_config_id_enable
                .sendRequest(res_add_config.data._id)
                .subscribe(
                  (res_make_defualt: ApiResponse) => {
                    this._http_service.get_users_min.sendRequest().subscribe(
                      (res_users_min: ApiResponse) => {
                        delete res_add_config.data.__v;
                        res_add_config.data.created_date = new Date(res_add_config.data.created_date);
                        res_add_config.data.is_active = true;

                        for (const user of res_users_min.data) {
                          if (res_add_config.data.created_by === user._id) {
                            res_add_config.data.extra_data = {
                              creator: {
                                username: user.username,
                                name: user.name
                              }
                            };
                            break;
                          }
                        }

                        for (const config of this.quotation_configs) {
                          config.is_active = false;
                        }

                        this.quotation_configs.push(res_add_config.data);

                        this.mode.adding_config = false;
                      },
                      (err_users_min: HttpErrorResponse) => {
                        console.error(err_users_min);
                        this.mode.adding_config = false;
                      }
                    );
                  },
                  (err_make_defualt: HttpErrorResponse) => {
                    console.error(err_make_defualt);
                    this.mode.adding_config = false;
                  }
                );
            } else {
              this._http_service.get_users_min.sendRequest().subscribe(
                (res_users_min: ApiResponse) => {
                  delete res_add_config.data.__v;
                  res_add_config.data.created_date = new Date(res_add_config.data.created_date);
                  res_add_config.data.is_active = false;

                  for (const user of res_users_min.data) {
                    if (res_add_config.data.created_by === user._id) {
                      res_add_config.data.extra_data = {
                        creator: {
                          username: user.username,
                          name: user.name
                        }
                      };
                      break;
                    }
                  }

                  this.quotation_configs.push(res_add_config.data);

                  this.mode.adding_config = false;
                },
                (err_users_min: HttpErrorResponse) => {
                  console.error(err_users_min);
                  this.mode.adding_config = false;
                }
              );
            }
          },
          (err: HttpErrorResponse) => {
            console.error(err);
            this.mode.adding_config = false;
          }
        );
      }
    });
  }

  showToast(message: string, action: string, duration: number = null, is_error: boolean = true) {
    const toast_config: any = {
      horizontalPosition: 'end'
    };
    if (duration !== null) {
      toast_config.duration = duration;
    }
    if (is_error) {
      toast_config.panelClass = 'toast-error';
    }

    this._toast.open(message, action, toast_config);
  }
}
