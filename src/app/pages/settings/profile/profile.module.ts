import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faUser as fasUser,
  faUserShield as fasUserShield,
  faCalendar as fasCalendar,
  faVenusMars as fasVenusMars,
  faEnvelope as fasEnvelope,
  faMobile as fasMobile,
  faSave as fasSave,
  faUndoAlt as fasUndoAlt,
  faMars as fasMars,
  faVenus as fasVenus,
  faTransgender as fasTransgender,
  faKey as fasKey,
  faCircleNotch as fasCircleNotch
} from '@fortawesome/free-solid-svg-icons';
library.add(
  fasUser,
  fasUserShield,
  fasCalendar,
  fasVenusMars,
  fasEnvelope,
  fasMobile,
  fasSave,
  fasUndoAlt,
  fasMars,
  fasVenus,
  fasTransgender,
  fasKey,
  fasCircleNotch
);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
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
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule {}
