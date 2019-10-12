import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewQuotationModalComponent } from './view-quotation-modal.component';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faTimes as fasTimes,
  faBuilding as fasBuilding,
  faListUl as fasListUl,
  faRupeeSign as fasRupeeSign
} from '@fortawesome/free-solid-svg-icons';
library.add(fasTimes, fasBuilding, fasListUl, fasRupeeSign);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

import { SubHeadModule } from 'src/app/components/sub-head/sub-head.module';

@NgModule({
  declarations: [ViewQuotationModalComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    SubHeadModule
  ],
  exports: [ViewQuotationModalComponent]
})
export class ViewQuotationModalModule {}
