import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material Imports */
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
library.add(fasHeart);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardLinkModule } from 'src/app/components/card-link/card-link.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,
    MatButtonModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    HomeRoutingModule,
    CardLinkModule
  ]
})
export class HomeModule {}
