import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faTimes as fasTimes,
  faUserPlus as fasUserPlus,
  faSave as fasSave,
  faAddressCard as fasAddressCard,
  faTasks as fasTasks,
  faUser as fasUser,
  faUserShield as fasUserShield,
  faCalendar as fasCalendar,
  faVenusMars as fasVenusMars,
  faEnvelope as fasEnvelope,
  faMobile as fasMobile,
  faUndoAlt as fasUndoAlt,
  faMars as fasMars,
  faVenus as fasVenus,
  faTransgender as fasTransgender,
  faKey as fasKey,
  faCircleNotch as fasCircleNotch,
  faUserLock as fasUserLock,
  faQuestionCircle as fasQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
library.add(
  fasTimes,
  fasUserPlus,
  fasSave,
  fasAddressCard,
  fasTasks,
  fasUser,
  fasUserShield,
  fasCalendar,
  fasVenusMars,
  fasEnvelope,
  fasMobile,
  fasUndoAlt,
  fasMars,
  fasVenus,
  fasTransgender,
  fasKey,
  fasCircleNotch,
  fasUserLock,
  fasQuestionCircle
);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

import { FormUserModalComponent } from './form-user-modal.component';
import { SubHeadModule } from 'src/app/components/sub-head/sub-head.module';

@NgModule({
  declarations: [FormUserModalComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,

    /* Angular Material Imports */
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    SubHeadModule
  ],
  exports: [FormUserModalComponent]
})
export class FormUserModalModule {}
