import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { CardLinkModule } from 'src/app/components/card-link/card-link.module';

@NgModule({
  declarations: [SystemComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,

    /* Other Imports */
    CommonModule,
    SystemRoutingModule,
    CardLinkModule
  ]
})
export class SystemModule {}
