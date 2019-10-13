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
import { UserData } from 'src/app/interfaces/user-data';
import { DialogResponse } from 'src/app/interfaces/dialog-response';
import { ApiResponse } from 'src/app/interfaces/api-response';

/* Modals Imports */
import { ViewUserModalComponent } from 'src/app/components/view-user-modal/view-user-modal.component';
import { FormUserModalComponent } from 'src/app/components/form-user-modal/form-user-modal.component';

const PAGE_ID = 'system-users';

interface Mode {
  editing_user_ids: string[];
  adding_user: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private _page_id = PAGE_ID;
  config: Config = new Config();

  mode: Mode = {
    editing_user_ids: [],
    adding_user: false
  };

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
    private _dialog: MatDialog,
    private _confirm_service: ConfirmService,
    public helper: HelperService
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
        this.getUsers();
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

  getUsers(): void {
    this._http_service.get_users.sendRequest().subscribe(
      (response: any) => {
        for (const user of response.data) {
          this.users_data.push({
            _id: user._id,
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
      },
      error => {
        console.error(error);
        this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
      }
    );
  }

  viewUserDetails(user: UserData) {
    this._dialog.open(ViewUserModalComponent, {
      autoFocus: false,
      data: user
    });
  }

  disableUser(user: UserData): void {
    const confirm_sub = this._confirm_service
      .confirm({
        title: 'Confirm Disable User',
        message: `Are you sure you want to disable user <b>${user.username}</b>?`,
        positive_btn_text: 'Yes',
        negative_btn_text: 'No'
      })
      .subscribe((resp: DialogResponse) => {
        if (resp && resp.operation === 'confirm.ok') {
          this.mode.editing_user_ids.push(user._id);
          this._http_service.patch_users_user_id_disable.sendRequest(user._id).subscribe(
            (res: ApiResponse) => {
              user.is_active = res.data.is_active;
              this.showToast('User disabled successfully', 'OK', 3000, false);
              if (this.mode.editing_user_ids.includes(user._id)) {
                this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(user._id), 1);
              }
            },
            (err: Error) => {
              console.error(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_user_ids.includes(user._id)) {
                this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(user._id), 1);
              }
            }
          );
        }
        confirm_sub.unsubscribe();
      });
  }

  editUser(user: UserData): void {
    const dialog_ref = this._dialog.open(FormUserModalComponent, {
      autoFocus: false,
      data: user
    });

    dialog_ref.afterClosed().subscribe((dialog_response: DialogResponse) => {
      if (dialog_response && dialog_response.operation === 'user.edit') {
        const user_data = dialog_response.data;
        this.mode.editing_user_ids.push(user_data._id);

        this._http_service.put_users_user_id.sendRequest(user_data._id, user_data).subscribe(
          (res: ApiResponse) => {
            for (const userdata of this.users_data) {
              if (userdata._id === res.data._id) {
                this.users_data[this.users_data.indexOf(userdata)] = res.data;
              }
            }

            this.showToast('Successfully saved user details.', 'OK', 3000, false);

            if (this.mode.editing_user_ids.includes(dialog_response.data._id)) {
              this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(res.data._id), 1);
            }
          },
          (error: Error) => {
            console.error(error);
            this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
            if (this.mode.editing_user_ids.includes(dialog_response.data._id)) {
              this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(dialog_response.data._id), 1);
            }
          }
        );
      }
    });
  }

  addUser(): void {
    const dialog_ref = this._dialog.open(FormUserModalComponent, {
      autoFocus: false,
      data: null
    });

    dialog_ref.afterClosed().subscribe((dialog_response: DialogResponse) => {
      if (dialog_response && dialog_response.operation === 'user.add') {
        this.mode.adding_user = true;
        const user_data = dialog_response.data;

        this._http_service.post_users.sendRequest(user_data).subscribe(
          (res: ApiResponse) => {
            this.users_data.push(res.data);
            this.showToast('Successfully added user.', 'OK', 3000, false);
            this.mode.adding_user = false;
          },
          (err: Error) => {
            console.error(err);
            this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
            this.mode.adding_user = false;
          }
        );
      }
    });
  }

  deleteUserPermanently(user: UserData): void {
    const confirm_sub = this._confirm_service
      .confirm({
        title: 'Confirm Delete User Permanently',
        message: `Are you sure you want to delete user <b>${user.username}</b> permanently?`,
        info: 'All data related to the user will be deleted. This operation cannot be undone.',
        positive_btn_text: 'Yes',
        negative_btn_text: 'No'
      })
      .subscribe((resp: DialogResponse) => {
        if (resp && resp.operation === 'confirm.ok') {
          this.mode.editing_user_ids.push(user._id);
          this._http_service.delete_users_user_id.sendRequest(user._id).subscribe(
            (res: ApiResponse) => {
              for (const user_data of this.users_data) {
                if (user_data._id === user._id) {
                  this.users_data.splice(this.users_data.indexOf(user_data), 1);
                  break;
                }
              }
              this.showToast('User deleted permanently successfully', 'OK', 3000, false);
              if (this.mode.editing_user_ids.includes(user._id)) {
                this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(user._id), 1);
              }
            },
            (err: Error) => {
              console.error(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_user_ids.includes(user._id)) {
                this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(user._id), 1);
              }
            }
          );
        }
        confirm_sub.unsubscribe();
      });
  }

  enableUser(user: UserData): void {
    const confirm_sub = this._confirm_service
      .confirm({
        title: 'Confirm Enable User',
        message: `Are you sure you want to enable user <b>${user.username}</b>?`,
        positive_btn_text: 'Yes',
        negative_btn_text: 'No'
      })
      .subscribe((resp: DialogResponse) => {
        if (resp && resp.operation === 'confirm.ok') {
          this.mode.editing_user_ids.push(user._id);
          this._http_service.patch_users_user_id_enable.sendRequest(user._id).subscribe(
            (res: ApiResponse) => {
              user.is_active = res.data.is_active;
              this.showToast('User enabled successfully', 'OK', 3000, false);
              if (this.mode.editing_user_ids.includes(user._id)) {
                this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(user._id), 1);
              }
            },
            (err: Error) => {
              console.error(err);
              this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
              if (this.mode.editing_user_ids.includes(user._id)) {
                this.mode.editing_user_ids.splice(this.mode.editing_user_ids.indexOf(user._id), 1);
              }
            }
          );
        }
        confirm_sub.unsubscribe();
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
