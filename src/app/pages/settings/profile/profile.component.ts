import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

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

const PAGE_ID = 'settings-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private _page_id = PAGE_ID;
  config: Config = new Config();

  form_profile: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    created_date: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    phone: new FormControl(null, Validators.pattern(this._regexp_sevice.phone))
  });

  original_profile_data: {
    name: string;
    gender: 'male' | 'female' | 'others';
    email: string;
    phone: string;
  };

  form_possword: FormGroup = new FormGroup({
    current_password: new FormControl(null, Validators.required),
    new_password: new FormControl(null, Validators.required),
    repeat_password: new FormControl(null, Validators.required)
  }, this._passwordMatchValidator);

  constructor(
    private _title: Title,
    private _toast: MatSnackBar,
    private _header_service: HeaderService,
    private _sidebar: SidebarComponent,
    private _http_service: HttpTransactionsService,
    private _localstorage_service: LocalStorageService,
    private _auth_service: AuthService,
    private _regexp_sevice: RegexService
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

    this._auth_service.auth_state_change.subscribe(
      (auth_state: boolean) => {
        if (auth_state) {
          this.getProfile();
        }
      }
    );
  }

  getProfile(): void {
    this._http_service.get_profile_user_id.sendRequest(
      this._localstorage_service.get(this._localstorage_service.lsname.user_id)
    ).subscribe(
      (response) => {
        console.log(response.data);
        this.form_profile.get('username').setValue(response.data.username);
        this.form_profile.get('created_date').setValue(moment(response.data.created_date).format('DD MMM, YYYY hh:mm A'));
        this.form_profile.get('name').setValue(response.data.name);
        this.form_profile.get('gender').setValue(response.data.gender);
        this.form_profile.get('email').setValue(response.data.email);
        this.form_profile.get('phone').setValue(response.data.phone);

        this.original_profile_data = {
          name: response.data.name,
          gender: response.data.gender,
          email: response.data.email,
          phone: response.data.phone
        };

        this._localstorage_service.set(this._localstorage_service.lsname.token, response.token);
      },
      (error) => {
        console.error(error);
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

  private _passwordMatchValidator(form: FormGroup): {[key: string]: boolean} | null {
    return form.get('new_password').value === form.get('repeat_password').value ? null : {'passwordMismatch': true};
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
}
