import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faUser as fasUser,
  faKey as fasKey,
  faEye as fasEye,
  faEyeSlash as fasEyeSlash,
  faSignInAlt as fasSignInAlt,
  faCircleNotch as fasCircleNotch
} from '@fortawesome/free-solid-svg-icons';
library.add(fasUser, fasKey, fasEye, fasEyeSlash, fasSignInAlt, fasCircleNotch);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

/* Components Imports */
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    /* Angular Imports */
    FormsModule,
    ReactiveFormsModule,

    /* Angular Material Imports */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule {}
