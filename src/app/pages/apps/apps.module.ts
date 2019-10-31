import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';

import { AppsRoutingModule } from './apps-routing.module';
import { AppsComponent } from './apps.component';
import { CardLinkModule } from 'src/app/components/card-link/card-link.module';

@NgModule({
  declarations: [AppsComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,

    /* Other Imports */
    CommonModule,
    AppsRoutingModule,
    CardLinkModule
  ]
})
export class AppsModule {}
