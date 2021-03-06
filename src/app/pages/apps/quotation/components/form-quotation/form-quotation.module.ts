import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/* Fontawesome Imports */
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
/* Solid Icons */
import {
  faTimes as fasTimes,
  faPlusSquare as fasPlusSquare,
  faSave as fasSave,
  faUndoAlt as fasUndoAlt,
  faQuestionCircle as fasQuestionCircle,
  faCircleNotch as fasCircleNotch,
  faIndustry as fasIndustry,
  faFileInvoice as fasFileInvoice,
  faVenusMars as fasVenusMars,
  faUser as fasUser,
  faPhoneAlt as fasPhoneAlt,
  faMapMarkerAlt as fasMapMarkerAlt,
  faList as fasList,
  faPlusCircle as fasPlusCircle,
  faInfoCircle as fasInfoCircle
} from '@fortawesome/free-solid-svg-icons';
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';

import { FormQuotationComponent } from './form-quotation.component';
import { SubHeadModule } from 'src/app/components/sub-head/sub-head.module';

@NgModule({
  declarations: [FormQuotationComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,

    /* Angular Material Imports */
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    SubHeadModule
  ],
  exports: [FormQuotationComponent]
})
export class FormQuotationModule {
  constructor(fa_icon_library: FaIconLibrary) {
    // Include solid fa icons
    fa_icon_library.addIcons(
      fasTimes,
      fasPlusSquare,
      fasSave,
      fasUndoAlt,
      fasQuestionCircle,
      fasCircleNotch,
      fasIndustry,
      fasFileInvoice,
      fasVenusMars,
      fasUser,
      fasPhoneAlt,
      fasMapMarkerAlt,
      fasList,
      fasPlusCircle,
      fasInfoCircle
    );
    // Include regular fa icons
    // Include brand fa icons
  }
}
