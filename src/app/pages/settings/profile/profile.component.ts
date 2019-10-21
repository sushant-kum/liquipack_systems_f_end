import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Md5 } from 'ts-md5/dist/md5';

/* Component Imports */
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { HeaderService } from 'src/app/services/header/header.service';
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

/* Config Imports */
import { Config } from 'src/app/configs/config';
import { RegexService } from 'src/app/services/regex/regex.service';

interface Mode {
  loading_page_content: boolean;
  saving_profile: boolean;
  changing_password: boolean;
}

interface ProfileData {
  name: string;
  gender: 'male' | 'female' | 'others';
  email: string;
  phone: string;
  password_hash: string;
}

const PAGE_ID = 'settings-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private _page_id = PAGE_ID;
  config: Config = new Config();

  private _auth_state_change_subscription: Subscription;

  mode: Mode = {
    loading_page_content: false,
    saving_profile: false,
    changing_password: false
  };

  user_id: string;

  form_profile: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    created_date: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    gender: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.pattern(this._regexp_sevice.phone))
  });

  original_profile_data: ProfileData;

  form_possword: FormGroup = new FormGroup(
    {
      current_password: new FormControl(null, Validators.required),
      new_password: new FormControl(null, Validators.required),
      repeat_password: new FormControl(null, Validators.required)
    },
    this._passwordMatchValidator
  );

  constructor(
    private _title: Title,
    private _toast: MatSnackBar,
    private _header_service: HeaderService,
    private _sidebar: SidebarComponent,
    private _http_service: HttpTransactionsService,
    private _localstorage_service: LocalStorageService,
    private _auth_service: AuthService,
    private _regexp_sevice: RegexService
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

    this.user_id = this._localstorage_service.get(this._localstorage_service.lsname.user_id);
    this._auth_state_change_subscription = this._auth_service.auth_state_change.subscribe((auth_state: boolean) => {
      if (auth_state) {
        this.getProfile();
      }
    });
  }

  ngOnDestroy(): void {
    this._auth_state_change_subscription.unsubscribe();
  }

  getProfile(): void {
    this.mode.loading_page_content = true;
    this._http_service.get_profile_user_id
      .sendRequest(this._localstorage_service.get(this._localstorage_service.lsname.user_id))
      .subscribe(
        response => {
          this.form_profile.get('username').setValue(response.data.username);
          this.form_profile
            .get('created_date')
            .setValue(moment(response.data.created_date).format('DD MMM, YYYY hh:mm A'));
          this.form_profile.get('name').setValue(response.data.name);
          this.form_profile.get('gender').setValue(response.data.gender);
          this.form_profile.get('email').setValue(response.data.email);
          this.form_profile.get('phone').setValue(response.data.phone);

          this.original_profile_data = {
            name: response.data.name,
            gender: response.data.gender,
            email: response.data.email,
            phone: response.data.phone,
            password_hash: response.data.password_hash
          };
          this.mode.loading_page_content = false;
        },
        error => {
          console.error(error);
          this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
          this.mode.loading_page_content = false;
        }
      );
  }

  isProfileFormEdited(): boolean {
    if (this.form_profile.get('username').value == null) {
      return false;
    } else {
      return (
        this.form_profile.get('name').value !== this.original_profile_data.name ||
        this.form_profile.get('gender').value !== this.original_profile_data.gender ||
        this.form_profile.get('email').value !== this.original_profile_data.email ||
        this.form_profile.get('phone').value !== this.original_profile_data.phone
      );
    }
  }

  resetProfileForm(): void {
    this.form_profile.get('name').setValue(this.original_profile_data.name);
    this.form_profile.get('gender').setValue(this.original_profile_data.gender);
    this.form_profile.get('email').setValue(this.original_profile_data.email);
    this.form_profile.get('phone').setValue(this.original_profile_data.phone);
  }

  saveProfile(): void {
    this.mode.saving_profile = true;

    const profile_data: ProfileData = {
      password_hash: this.original_profile_data.password_hash,
      name: this.form_profile.get('name').value,
      email: this.form_profile.get('email').value,
      phone: this.form_profile.get('phone').value ? this.form_profile.get('phone').value : null,
      gender: this.form_profile.get('gender').value ? this.form_profile.get('gender').value : null
    };

    this._http_service.put_profile_user_id
      .sendRequest(this._localstorage_service.get(this._localstorage_service.lsname.user_id), profile_data)
      .subscribe(
        (res: any) => {
          this.original_profile_data.name = profile_data.name;
          this.original_profile_data.email = profile_data.email;
          this.original_profile_data.phone = profile_data.phone;
          this.original_profile_data.gender = profile_data.gender;

          this.showToast('Profile Saved Successfully', 'Close', 3000, false);

          this.mode.saving_profile = false;
        },
        error => {
          console.error(error);
          this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
          this.mode.saving_profile = false;
        }
      );
  }

  private _passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    return form.get('new_password').value === form.get('repeat_password').value ? null : { passwordMismatch: true };
  }

  isPasswordFormEdited(): boolean {
    return (
      this.form_possword.get('current_password').value !== null ||
      this.form_possword.get('new_password').value !== null ||
      this.form_possword.get('repeat_password').value !== null
    );
  }

  clearPasswordForm(): void {
    this.form_possword.get('current_password').setValue(null);
    this.form_possword.get('new_password').setValue(null);
    this.form_possword.get('repeat_password').setValue(null);
    this.form_possword.markAsUntouched();
  }

  changePassword() {
    this.mode.changing_password = true;
    if (
      new Md5().appendStr(this.form_possword.get('current_password').value).end() ===
      this.original_profile_data.password_hash
    ) {
      const profile_data: ProfileData = JSON.parse(JSON.stringify(this.original_profile_data));
      profile_data.password_hash = new Md5()
        .appendStr(this.form_possword.get('new_password').value)
        .end()
        .toString();

      this._http_service.put_profile_user_id
        .sendRequest(this._localstorage_service.get(this._localstorage_service.lsname.user_id), profile_data)
        .subscribe(
          res => {
            this.original_profile_data.password_hash = profile_data.password_hash;
            this.clearPasswordForm();

            this.showToast('Password changed successfully.', 'Close', 3000, false);

            this.mode.changing_password = false;
          },
          error => {
            console.error(error);
            this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
            this.mode.changing_password = false;
          }
        );
    } else {
      this.showToast('Current Password entered is incorrect', 'Close');
      this.mode.changing_password = false;
    }
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
