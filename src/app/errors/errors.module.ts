import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faExclamationCircle as fasExclamationCircle,
  faChevronRight as fasChevronRight,
  faArrowLeft as fasArrowLeft,
  faHome as fasHome
} from '@fortawesome/free-solid-svg-icons';
library.add(fasExclamationCircle, fasChevronRight, fasArrowLeft, fasHome);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

import { ErrorsRoutingModule } from './errors-routing.module';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [/* Angular Imports */
    FormsModule,
    ReactiveFormsModule,

    /* Angular Material Imports */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
