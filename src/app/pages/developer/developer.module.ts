import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';

import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DeveloperComponent],
  imports: [
    CommonModule,
    DeveloperRoutingModule,
    MatCardModule
  ]
})
export class DeveloperModule { }
