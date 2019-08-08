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
    phone: new FormControl(null, [Validators.pattern(this._regex_service.phone)])
  });
  constructor(
    private _regex_service: RegexService,
    public config: Config,
    public helper: HelperService,
    public dialogRef: MatDialogRef<FormUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserData
  ) { }

  ngOnInit() {
    if (this.user != null) {
      this.new_user = false;
      this.form_user_details.get('username').setValue(this.user.username);
      this.form_user_details.get('name').setValue(this.user.name);
      this.form_user_details.get('gender').setValue(this.user.gender);
      this.form_user_details.get('email').setValue(this.user.email);
      this.form_user_details.get('phone').setValue(this.user.phone);
    } else {
      this.new_user = true;
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
