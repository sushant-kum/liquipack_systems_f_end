import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {} from '@fortawesome/free-solid-svg-icons';
library.add();
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { CardLinkModule } from 'src/app/components/card-link/card-link.module';

@NgModule({
  declarations: [SystemComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    SystemRoutingModule,
    CardLinkModule
  ]
})
export class SystemModule {}
