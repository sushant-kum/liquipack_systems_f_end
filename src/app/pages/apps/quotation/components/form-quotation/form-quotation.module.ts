import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/* Angular Material Imports */
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faTimes as fasTimes,
  faPlusSquare as fasPlusSquare,
  faSave as fasSave,
  faUndoAlt as fasUndoAlt,
  faQuestionCircle as fasQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
library.add(fasTimes, fasPlusSquare, fasSave, fasUndoAlt, fasQuestionCircle);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

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

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    SubHeadModule
  ],
  exports: [FormQuotationComponent]
})
export class FormQuotationModule {}
