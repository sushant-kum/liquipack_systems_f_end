import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/* Config Imports */
import { Config } from 'src/app/configs/config';

/* Service Imports */
import { HelperService } from 'src/app/services/helper/helper.service';
import { RegexService } from 'src/app/services/regex/regex.service';

/* Interface Imports */
import { UserData } from 'src/app/interfaces/user-data';
import { MatCheckboxChange } from '@angular/material/checkbox';

interface PageInfo {
  identifier: string;
  name: string;
  is_subpage: boolean;
  parent_page: string;
  path: string;
  permissions: {
    read: boolean;
    write: boolean;
  };
}

@Component({
  selector: 'app-form-user-modal',
  templateUrl: './form-user-modal.component.html',
  styleUrls: ['./form-user-modal.component.scss']
})
export class FormUserModalComponent implements OnInit {
  new_user: boolean;

  form_user_details: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.pattern(this._regex_service.phone)]),
    password: new FormControl(null),
    confirm_password: new FormControl(null),
  }, this._passwordMatchValidator);

  pages: string[] = [];
  pages_info: { [key: string]: PageInfo } = {};
  global_pages: string[] = [];

  constructor(
    private _regex_service: RegexService,
    public config: Config,
    public helper: HelperService,
    public dialogRef: MatDialogRef<FormUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserData
  ) { }

  ngOnInit() {
    this.pages = this.config.pages;
    if (this.pages.includes('login')) {
      this.pages.splice(this.pages.indexOf('login'), 1);
    }
    for (const page of this.pages) {
      this.pages_info[page] = {
        identifier: this.config.page_map[page].identifier,
        name: this.config.page_map[page].name,
        is_subpage: this.config.page_map[page].is_subpage,
        parent_page: this.config.page_map[page].parent_page,
        path: this.config.page_map[page].path,
        permissions: {
          read: false,
          write: false
        }
      };
    }
    for (const global_page of this.config.global_apps) {
      this.global_pages.push(global_page.identifier);
      this.pages_info[global_page.identifier].permissions = {
        read: global_page.permissions.includes('read'),
        write: global_page.permissions.includes('write')
      };
    }

    if (this.user != null) {
      this.new_user = false;
      this._populateUserDetails();
      this._populateUserPermissions();
    } else {
      this.new_user = true;
    }
  }

  private _populateUserDetails(): void {
    this.form_user_details.get('username').setValue(this.user.username);
    this.form_user_details.get('name').setValue(this.user.name);
    this.form_user_details.get('gender').setValue(this.user.gender);
    this.form_user_details.get('email').setValue(this.user.email);
    this.form_user_details.get('phone').setValue(this.user.phone);
  }

  private _populateUserPermissions(): void {
    for (const app_permission of this.user.app_permissions) {
      this.pages_info[app_permission.app].permissions = {
        read: app_permission.permissions.includes('read'),
        write: app_permission.permissions.includes('write')
      };
    }
  }

  permissionChanged(event: MatCheckboxChange, page: string, permission: 'read' | 'write') {
    // console.log(
    //   'permissionChanged($event: MatCheckboxChange, page: string, permission: \'read\' | \'write\')',
    //   'event', event,
    //   'page', page,
    //   'permission', permission
    // );
    if (this.pages_info[page].is_subpage && event.checked === true) {
      this.pages_info[this.pages_info[page].parent_page].permissions[permission] = true;
    } else if (event.checked === false) {
      for (const pg of this.pages) {
        if (this.pages_info[pg].parent_page === page) {
          this.pages_info[pg].permissions[permission] = false;
        }
      }
    }
  }

  private _passwordMatchValidator(form: FormGroup): {[key: string]: boolean} | null {
    return form.get('password').value === form.get('confirm_password').value ? null : {passwordMismatch: true};
  }

  resetForm() {
    if (this.new_user) {
      this.form_user_details.get('username').setValue(null);
      this.form_user_details.get('name').setValue(null);
      this.form_user_details.get('gender').setValue(null);
      this.form_user_details.get('email').setValue(null);
      this.form_user_details.get('phone').setValue(null);
      this.form_user_details.get('password').setValue(null);
      this.form_user_details.get('confirm_password').setValue(null);

      for (const page of this.pages) {
        if (!this.global_pages.includes(page)) {
          this.pages_info[page].permissions = {
            read: false,
            write: false
          };
        }
      }
    } else {
      this._populateUserDetails();
      this.form_user_details.get('password').setValue(null);
      this.form_user_details.get('confirm_password').setValue(null);

      this._populateUserPermissions();
    }
    this.form_user_details.markAsUntouched();
  }

  isProfileFormEdited(): boolean {
    if (this.new_user) {
      return (
        this.form_user_details.get('username') != null ||
        this.form_user_details.get('name') != null ||
        this.form_user_details.get('gender') != null ||
        this.form_user_details.get('email') != null ||
        this.form_user_details.get('phone') != null ||
        this.form_user_details.get('password') != null ||
        this.form_user_details.get('confirm_password') != null
      );
    } else {
      return (
        this.form_user_details.get('name').value !== this.user.name ||
        this.form_user_details.get('gender').value !== this.user.gender ||
        this.form_user_details.get('email').value !== this.user.email ||
        this.form_user_details.get('phone').value !== this.user.phone ||
        this.form_user_details.get('password') != null ||
        this.form_user_details.get('confirm_password') != null
      );
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}