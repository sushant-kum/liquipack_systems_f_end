import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as moment from 'moment';


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

interface Mode {}

const PAGE_ID = 'apps-quotation';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit, OnDestroy {
  private _page_id = PAGE_ID;
  config: Config = new Config();

  private _auth_state_change_subscription: Subscription;

  mode: Mode = {};

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
    public helper_service: HelperService
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
        for (const quotation of res.data) {
          let total_price = 0;
          for (const key of Object.keys(quotation)) {
            if (quotation[key] && quotation[key].price) {
              total_price += quotation[key].price;
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
              total_price
            }
          });
        }
      },
      (err: Error) => {
        console.log(err);
        this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
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
