import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { CardLinkModule } from 'src/app/components/card-link/card-link.module';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,

    /* Other Imports */
    CommonModule,
    SettingsRoutingModule,
    CardLinkModule
  ]
})
export class SettingsModule {}
