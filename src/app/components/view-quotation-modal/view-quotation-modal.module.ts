import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewQuotationModalComponent } from './view-quotation-modal.component';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

/* Fontawesome Imports */
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
/* Solid Icons */
import {
  faTimes as fasTimes,
  faBuilding as fasBuilding,
  faListUl as fasListUl,
  faRupeeSign as fasRupeeSign
} from '@fortawesome/free-solid-svg-icons';
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';

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
export class ViewQuotationModalModule {
  constructor(fa_icon_library: FaIconLibrary) {
    // Include solid fa icons
    fa_icon_library.addIcons(fasTimes, fasBuilding, fasListUl, fasRupeeSign);
    // Include regular fa icons
    // Include brand fa icons
  }
}
