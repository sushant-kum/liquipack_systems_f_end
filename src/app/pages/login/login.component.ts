import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from 'src/app/configs/config';
import { HeaderService } from 'src/app/services/header/header.service';
import { FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

/* Services Imports */
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { CookieService } from 'src/app/services/cookie/cookie.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/* Interfaces Imports */
import { ApiResponse } from 'src/app/interfaces/api-response';
import { MatSnackBar } from '@angular/material/snack-bar';


interface Mode {
  password_visible: boolean;
  logging_in: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  config: Config = new Config();

  mode: Mode = {
    password_visible: false,
    logging_in: false
  };

  col_height_px: number;

  username_ctrl: FormControl = new FormControl(null, [
    Validators.required
  ]);
  password_ctrl: FormControl = new FormControl(null, [
    Validators.required
  ]);

  constructor(
    private title: Title,
    private toast: MatSnackBar,
    private header_service: HeaderService,
    private http_service: HttpTransactionsService,
    private localstorage_service: LocalStorageService,
    private cookie_service: CookieService,
    private auth_service: AuthService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.config.page_map.login.name + ' - ' + this.config.app_title);
    this.header_service.changePageInfo(
      this.config.page_map.login.identifier,
      this.config.page_map.login.name,
      this.config.page_map.login.fas_icon
    );

    this.col_height_px = document.getElementById('login-form-holder').offsetHeight;

    $('#input-username').on('keypress', (e) => {
      if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        this.login();
      }
    });
    $('#input-password').on('keypress', (e) => {
      if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        this.login();
      }
    });

    if (this.localstorage_service.exists(this.localstorage_service.lsname.username) && this.localstorage_service.exists(this.localstorage_service.lsname.token)) {
      this.login(true);
    }
  }

  togglePasswordVisibility() {
    this.mode.password_visible = !this.mode.password_visible;
  }
  loginFormValid() {
    if (!this.username_ctrl.value || this.username_ctrl.value.length === 0) {
      return false;
    }
    if (!this.password_ctrl.value || this.password_ctrl.value.length === 0) {
      return false;
    }
    return true;
  }

  login(use_token: boolean = false) {
    const urlParams = new URLSearchParams(window.location.search);
    let redirect_path: string = this.config.default_app_path;
    console.log(urlParams.has('redirect'), urlParams.get('redirect'), this.config.page_map[urlParams.get('redirect')]);
    if (urlParams.has('redirect')) {
      if (this.config.page_map[urlParams.get('redirect')] !== undefined) {
        redirect_path = this.config.page_map[urlParams.get('redirect')].path;
      }
    }

    if (use_token) {
      const username = this.localstorage_service.get(this.localstorage_service.lsname.username);
      const token = this.localstorage_service.get(this.localstorage_service.lsname.token);
      if (username && token) {
        this.auth_service.auth_user_token((error, new_token) => {
          if (new_token) {
            this.localstorage_service.set(this.localstorage_service.lsname.token, new_token);
            window.location.href = redirect_path;
          } else {
            this.localstorage_service.deleteMulti([
              this.localstorage_service.lsname.app_permissions,
              this.localstorage_service.lsname.token,
              this.localstorage_service.lsname.user_id,
              this.localstorage_service.lsname.username
            ]);
          }
        });
      } else {
        this.localstorage_service.deleteAll();
      }
    } else {
      this.mode.logging_in = true;
      this.http_service.get_login.sendRequest(this.username_ctrl.value, this.password_ctrl.value).subscribe(
        (data: ApiResponse) => {
          if (data.status === 'success') {
            this.localstorage_service.set(this.localstorage_service.lsname.user_id, data.user_id);
            this.localstorage_service.set(this.localstorage_service.lsname.username, this.username_ctrl.value);
            this.localstorage_service.set(this.localstorage_service.lsname.token, data.token);
            this.localstorage_service.set(this.localstorage_service.lsname.app_permissions, JSON.stringify(data.data.app_permissions));
            window.location.href = redirect_path;
          } else {
            this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
          }
          this.mode.logging_in = false;
        },
        (error) => {
          console.error(error);
          if (error.status === 401) {
            this.showToast('Username/password provided is incorrect.', 'Close', null, true);
          } else {
            this.showToast('Something went wrong. Please try again later.', 'Close', null, true);
          }
          this.mode.logging_in = false;
        }
      );
    }
  }

  showToast(message: string, action: string, duration: number = null, is_error: boolean = true) {
    if (duration == null) {
      this.toast.open(message, action, {
        horizontalPosition: 'end',
        panelClass: [is_error ? 'toast-error' : '']
      });
    } else {
      this.toast.open(message, action, {
        horizontalPosition: 'end',
        duration,
        panelClass: [is_error ? 'toast-error' : '']
      });
    }
  }
}
