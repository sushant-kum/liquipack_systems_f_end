import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faPhone as fasPhone,
  faEnvelope as fasEnvelope,
  faEye as fasEye,
  faUserTimes as fasUserTimes,
  faUserEdit as fasUserEdit,
  faUserPlus as fasUserPlus,
  faCheckCircle as fasCheckCircle,
  faChevronDown as fasChevronDown,
  faTrash as fasTrash
} from '@fortawesome/free-solid-svg-icons';
library.add(
  fasPhone,
  fasEnvelope,
  fasEye,
  fasUserTimes,
  fasUserEdit,
  fasUserPlus,
  fasCheckCircle,
  fasChevronDown,
  fasTrash
);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ViewUserModalComponent } from 'src/app/components/view-user-modal/view-user-modal.component';
import { ViewUserModalModule } from 'src/app/components/view-user-modal/view-user-modal.module';
import { FormUserModalComponent } from 'src/app/components/form-user-modal/form-user-modal.component';
import { FormUserModalModule } from 'src/app/components/form-user-modal/form-user-modal.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    ViewUserModalModule,
    FormUserModalModule
  ],
  entryComponents: [ViewUserModalComponent, FormUserModalComponent]
})
export class UsersModule {}
