import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faUser as fasUser,
  faUserShield as fasUserShield
} from '@fortawesome/free-solid-svg-icons';
library.add(fasUser, fasUserShield);
/* Regular Icons */
import { } from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import { } from '@fortawesome/free-brands-svg-icons';
library.add();

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
