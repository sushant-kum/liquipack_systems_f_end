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
    password: new FormControl(null, [Validators.required]),
    confirm_password: new FormControl(null, [Validators.required]),
  });

  pages: string[] = [];
  pages_info: { [key: string]: PageInfo } = {};
  global_pages: string[] = [];
  // global_pages_info: {[key: string]: PageInfo} = {};

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
      this.form_user_details.get('username').setValue(this.user.username);
      this.form_user_details.get('name').setValue(this.user.name);
      this.form_user_details.get('gender').setValue(this.user.gender);
      this.form_user_details.get('email').setValue(this.user.email);
      this.form_user_details.get('phone').setValue(this.user.phone);

      for (const app_permission of this.user.app_permissions) {
        this.pages_info[app_permission.app].permissions = {
          read: app_permission.permissions.includes('read'),
          write: app_permission.permissions.includes('write')
        };
      }
    } else {
      this.new_user = true;
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
