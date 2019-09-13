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

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faCheckCircle as fasCheckCircle,
  faTrash as fasTrash,
  faPenSquare as fasPenSquare,
  faPlusSquare as fasPlusSquare
} from '@fortawesome/free-solid-svg-icons';
library.add(fasCheckCircle, fasTrash, fasPenSquare, fasPlusSquare);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

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
export class QuotationConfigModule {}
