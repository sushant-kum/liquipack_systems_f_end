import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

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
import { QuotationData } from 'src/app/interfaces/quotation-data';
import { DialogResponse } from 'src/app/interfaces/dialog-response';
import { ApiResponse } from 'src/app/interfaces/api-response';

/* Modals Imports */
import { ViewQuotationModalComponent } from 'src/app/components/view-quotation-modal/view-quotation-modal.component';

interface Mode {
  editing_quotation_ids: string[];
}

const PAGE_ID = 'apps-quotation';

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
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit, OnDestroy {
  private _page_id = PAGE_ID;
  private _auth_state_change_subscription: Subscription;

  config: Config = new Config();
  mode: Mode = {
    editing_quotation_ids: []
  };

  app_permission: ('read' | 'write')[] = [];

  quotations: QuotationData[] = [];

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
    public helper: HelperService
  ) { }

  ngOnInit() {
    this._title.setTitle(this.config.page_map[this._page_id].name + ' - ' + this.config.app_title);
    this._header_service.changePageInfo(
      this.config.page_map[this._page_id].identifier,
      this.config.page_map[this._page_id].name,
      this.config.page_map[this._page_id].fas_icon
    );

    this._sidebar.activate();
    this._sidebar.colorize(this.config.page_map[this._page_id].identifier);

    this._auth_state_change_subscription = this._auth_service.auth_state_change.subscribe(
      (auth_state: boolean) => {
        if (auth_state) {
          this.getQuotations();
          const app_permissions = JSON.parse(this._localstorage_service.get(this._localstorage_service.lsname.app_permissions));
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
      }
    );
  }

  ngOnDestroy(): void {
    this._auth_state_change_subscription.unsubscribe();
  }

  routeToConfig(): void {
    this._sidebar.redirectTo('/apps/quotation/config', null, true);
  }

  getQuotations(): void {
    this._http_service.get_quotations.sendRequest().subscribe(
      (res: ApiResponse) => {
        this._http_service.get_users_min.sendRequest().subscribe(
          (get_users_res: ApiResponse) => {
            const users_data = get_users_res.data;

            for (const quotation of res.data) {
              let total_price = 0;
              let user_name: string;

              for (const key of Object.keys(quotation)) {
                if (quotation[key] && quotation[key].price) {
                  total_price += quotation[key].price;
                }
              }

              for (const user_data of users_data) {
                if (quotation.crated_by === user_data._id) {
                  user_name = user_data.name;
                  break;
                }
              }

              this.quotations.push({
                _id: quotation._id,
                quotation_num: quotation.quotation_num,
                speed: quotation.speed,
                no_of_washes: quotation.no_of_washes,
                industry: quotation.industry,
                gmp_requirement: quotation.gmp_requirement,
                bottle_moc: quotation.bottle_moc,
                water_saving: quotation.water_saving,
                filters_required: quotation.filters_required,
                illumination_required: quotation.illumination_required,
                auto_level_tank: quotation.auto_level_tank,
                extra_cups_sets: quotation.extra_cups_sets,
                other_details: quotation.other_details ? quotation.other_details : null,
                customer_details: quotation.customer_details,
                crated_by: quotation.crated_by,
                created_date: quotation.created_date,
                is_active: quotation.is_active,
                extra_data: {
                  total_price,
                  creator_name: user_name
                }
              });
            }
          },
          (get_users_err: Error) => {
            console.log(get_users_err);
            this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
          }
        );
      },
      (err: Error) => {
        console.log(err);
        this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
      }
    );
  }

  viewQuotationDetails(quotation: QuotationData): void {
    this._dialog.open(ViewQuotationModalComponent, {
      autoFocus: false,
      data: {
        quotation,
        meta: {
          quotaion_items_key_name_mapping: QUOTAION_ITEM_NAMES
        }
      }
    });
  }

  disableQuotation(quotation: QuotationData): void {
    const confirm_sub = this._confirm_service.confirm({
      title: 'Confirm Disable Quotation',
      message: `Are you sure you want to disable quotation <b>${quotation.quotation_num}</b>?`,
      positive_btn_text: 'Yes',
      negative_btn_text: 'No'
    }).subscribe(
      (dialog_resp: DialogResponse) => {
        if (dialog_resp && dialog_resp.operation === 'confirm.ok') {
          this.mode.editing_quotation_ids.push(quotation._id);
          this._http_service.patch_quotations_quotation_id_disable.sendRequest(quotation._id).subscribe(
            (res: ApiResponse) => {
              quotation.is_active = res.data.is_active;
              this.showToast('Quotation disabled successfully', 'OK', 3000, false);
              if (this.mode.editing_quotation_ids.includes(quotation._id)) {
                this.mode.editing_quotation_ids.splice(this.mode.editing_quotation_ids.indexOf(quotation._id), 1);
              }
            },
            (err: Error) => {
              console.log(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_quotation_ids.includes(quotation._id)) {
                this.mode.editing_quotation_ids.splice(this.mode.editing_quotation_ids.indexOf(quotation._id), 1);
              }
            }
          );
        }
        confirm_sub.unsubscribe();
      }
    );
  }

  enableQuotation(quotation: QuotationData): void {
    const confirm_sub = this._confirm_service.confirm({
      title: 'Confirm Enable Quotation',
      message: `Are you sure you want to enable quotation <b>${quotation.quotation_num}</b>?`,
      positive_btn_text: 'Yes',
      negative_btn_text: 'No'
    }).subscribe(
      (dialog_resp: DialogResponse) => {
        if (dialog_resp && dialog_resp.operation === 'confirm.ok') {
          this.mode.editing_quotation_ids.push(quotation._id);
          this._http_service.patch_quotations_quotation_id_enable.sendRequest(quotation._id).subscribe(
            (res: ApiResponse) => {
              quotation.is_active = res.data.is_active;
              this.showToast('Quotation enable successfully', 'OK', 3000, false);
              if (this.mode.editing_quotation_ids.includes(quotation._id)) {
                this.mode.editing_quotation_ids.splice(this.mode.editing_quotation_ids.indexOf(quotation._id), 1);
              }
            },
            (err: Error) => {
              console.log(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_quotation_ids.includes(quotation._id)) {
                this.mode.editing_quotation_ids.splice(this.mode.editing_quotation_ids.indexOf(quotation._id), 1);
              }
            }
          );
        }
        confirm_sub.unsubscribe();
      }
    );
  }

  deleteQuotationPermanently(quotation: QuotationData): void {
    const confirm_sub = this._confirm_service.confirm({
      title: 'Confirm Delete Quotation Permanently',
      message: `Are you sure you want to delete quotation <b>${quotation.quotation_num}</b> permanently?`,
      info: 'All data related to the quotation will be deleted. This operation cannot be undone.',
      positive_btn_text: 'Yes',
      negative_btn_text: 'No'
    }).subscribe(
      (resp: DialogResponse) => {
        if (resp && resp.operation === 'confirm.ok') {
          this.mode.editing_quotation_ids.push(quotation._id);
          this._http_service.delete_quotations_quotation_id.sendRequest(quotation._id).subscribe(
            (res: ApiResponse) => {
              for (const quote of this.quotations) {
                if (quote._id === quotation._id) {
                  this.quotations.splice(this.quotations.indexOf(quote), 1);
                  break;
                }
              }
              this.showToast('Quotation deleted permanently successfully', 'OK', 3000, false);
              if (this.mode.editing_quotation_ids.includes(quotation._id)) {
                this.mode.editing_quotation_ids.splice(this.mode.editing_quotation_ids.indexOf(quotation._id), 1);
              }
            },
            (err: Error) => {
              console.error(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_quotation_ids.includes(quotation._id)) {
                this.mode.editing_quotation_ids.splice(this.mode.editing_quotation_ids.indexOf(quotation._id), 1);
              }
            }
          );
        }
        confirm_sub.unsubscribe();
      }
    );
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
