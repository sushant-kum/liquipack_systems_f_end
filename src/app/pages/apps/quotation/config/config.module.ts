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

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import { } from '@fortawesome/free-solid-svg-icons';
library.add();
/* Regular Icons */
import { } from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import { } from '@fortawesome/free-brands-svg-icons';
library.add();
import { ConfigRoutingModule } from './config-routing.module';
import { ConfigComponent } from './config.component';


@NgModule({
  declarations: [ConfigComponent],
  imports: [
    /* Angular Material Imports */
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,

    /* Font-awesome Impors */
    FontAwesomeModule,

    /* Other Imports */
    CommonModule,
    ConfigRoutingModule,
    ReactiveFormsModule
  ]
})
export class ConfigModule { }
