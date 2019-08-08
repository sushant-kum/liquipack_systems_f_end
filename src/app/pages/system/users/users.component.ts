import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';

/* Component Imports */
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { HeaderService } from 'src/app/services/header/header.service';
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

/* Config Imports */
import { Config } from 'src/app/configs/config';
import { RegexService } from 'src/app/services/regex/regex.service';

/* Interface Imports */
import { UserData } from 'src/app/interfaces/user-data';

/* Modals Imports */
import { ViewUserModalComponent } from 'src/app/components/view-user-modal/view-user-modal.component';
import { FormUserModalComponent } from 'src/app/components/form-user-modal/form-user-modal.component';
import { Subscription } from 'rxjs';

const PAGE_ID = 'system-users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private _page_id = PAGE_ID;
  config: Config = new Config();

  private _auth_state_change_subscription: Subscription;

  app_permission: ('read' | 'write')[] = [];

  users_data: UserData[] = [];
  constructor(
    private _title: Title,
    private _toast: MatSnackBar,
    private _header_service: HeaderService,
    private _sidebar: SidebarComponent,
    private _http_service: HttpTransactionsService,
    private _localstorage_service: LocalStorageService,
    private _auth_service: AuthService,
    private _regexp_sevice: RegexService,
    private _dialog: MatDialog,
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
          this.getUsers();
          const app_permissions = JSON.parse(this._localstorage_service.get(this._localstorage_service.lsname.app_permissions));
          for (const  app of app_permissions) {
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

  getUsers(): void {
    this._http_service.get_users.sendRequest().subscribe(
      (response: any) => {
        for (const user of response.data) {
          this.users_data.push({
            id: user._id,
            username: user.username,
            created_date: user.created_date,
            app_permissions: user.app_permissions,
            is_active: user.is_active,
            password_hash: user.password_hash,
            name: user.name,
            gender: user.gender,
            email: user.email,
            phone: user.phone
          });
        }

        this._localstorage_service.set(this._localstorage_service.lsname.token, response.token);
      },
      (error) => {
        console.error(error);
        this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
      }
    );
  }

  viewUserDetails(user: UserData) {
    const dialog_ref = this._dialog.open(ViewUserModalComponent, {
      autoFocus: false,
      data: user
    });

    dialog_ref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editUser(user: UserData): void {
    const dialog_ref = this._dialog.open(FormUserModalComponent, {
      autoFocus: false,
      data: user
    });

    dialog_ref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addUser(): void {
    const dialog_ref = this._dialog.open(FormUserModalComponent, {
      autoFocus: false,
      data: null
    });

    dialog_ref.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
