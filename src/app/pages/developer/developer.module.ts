import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DeveloperRoutingModule } from "./developer-routing.module";
import { DeveloperComponent } from "./developer.component";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

/* Fontawesome Imports */
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
/* Solid Icons */
import {
  faGlobe as fasGlobe,
  faEnvelopeOpen as fasEnvelopeOpen
} from "@fortawesome/free-solid-svg-icons";
library.add(fasGlobe, fasEnvelopeOpen);
/* Regular Icons */
import {} from "@fortawesome/free-regular-svg-icons";
library.add();
/* Brand Icons */
import { faGithubAlt as fabGithubAlt } from "@fortawesome/free-brands-svg-icons";
library.add(fabGithubAlt);

@NgModule({
  declarations: [DeveloperComponent],
  imports: [
    CommonModule,
    DeveloperRoutingModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class DeveloperModule {}
