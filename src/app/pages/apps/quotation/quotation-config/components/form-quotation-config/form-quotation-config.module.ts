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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

/* Fontawesome Imports */
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
/* Solid Icons */
import {
  faTimes as fasTimes,
  faPlusSquare as fasPlusSquare,
  faSave as fasSave,
  faUndoAlt as fasUndoAlt,
  faInfo as fasInfo,
  faCog as fasCog,
  faQuestionCircle as fasQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';

import { FormQuotationConfigComponent } from './form-quotation-config.component';
import { SubHeadModule } from 'src/app/components/sub-head/sub-head.module';

@NgModule({
  declarations: [FormQuotationConfigComponent],
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
    MatSlideToggleModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    SubHeadModule
  ],
  exports: [FormQuotationConfigComponent]
})
export class FormQuotationConfigModule {
  constructor(fa_library: FaIconLibrary) {
    // Include solid fa icons
    fa_library.addIcons(fasTimes, fasPlusSquare, fasSave, fasUndoAlt, fasInfo, fasCog, fasQuestionCircle);
    // Include regular fa icons
    // Include brand fa icons
  }
}
