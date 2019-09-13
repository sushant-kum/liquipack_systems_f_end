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
  faEye as fasEye,
  faBuilding as fasBuilding,
  faRupeeSign as fasRupeeSign,
  faCalendarDay as fasCalendarDay,
  faTimesCircle as fasTimesCircle,
  faPenSquare as fasPenSquare,
  faChevronDown as fasChevronDown,
  faTrash as fasTrash,
  faCheckCircle as fasCheckCircle,
  faPlusSquare as fasPlusSquare
} from '@fortawesome/free-solid-svg-icons';
library.add(
  fasEye,
  fasBuilding,
  fasRupeeSign,
  fasCalendarDay,
  fasTimesCircle,
  fasPenSquare,
  fasChevronDown,
  fasTrash,
  fasCheckCircle,
  fasPlusSquare
);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';
import { ViewQuotationModalComponent } from 'src/app/components/view-quotation-modal/view-quotation-modal.component';
import { ViewQuotationModalModule } from 'src/app/components/view-quotation-modal/view-quotation-modal.module';

@NgModule({
  declarations: [QuotationComponent],
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
    QuotationRoutingModule,
    ReactiveFormsModule,
    ViewQuotationModalModule
  ],
  entryComponents: [ViewQuotationModalComponent]
})
export class QuotationModule {}
