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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/* Fontawesome Imports */
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
/* Solid Icons */
import {
  faCheckCircle as fasCheckCircle,
  faTrash as fasTrash,
  faPenSquare as fasPenSquare,
  faPlusSquare as fasPlusSquare
} from '@fortawesome/free-solid-svg-icons';
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';

import { QuotationConfigRoutingModule } from './quotation-config-routing.module';
import { QuotationConfigComponent } from './quotation-config.component';
import { FormQuotationConfigComponent } from './components/form-quotation-config/form-quotation-config.component';
import { FormQuotationConfigModule } from './components/form-quotation-config/form-quotation-config.module';

@NgModule({
  declarations: [QuotationConfigComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    QuotationConfigRoutingModule,
    ReactiveFormsModule,
    FormQuotationConfigModule
  ],
  entryComponents: [FormQuotationConfigComponent]
})
export class QuotationConfigModule {
  constructor(fa_library: FaIconLibrary) {
    // Include solid fa icons
    fa_library.addIcons(fasCheckCircle, fasTrash, fasPenSquare, fasPlusSquare);
    // Include regular fa icons
    // Include brand fa icons
  }
}
