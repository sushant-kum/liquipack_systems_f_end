import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material Imports */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
/* Solid Icons */
import {
  faUnlockAlt as fasUnlockAlt,
  faHome as fasHome,
  faCogs as fasCogs,
  faUser as fasUser,
  faSlidersH as fasSlidersH,
  faUsers as fasUsers,
  faCode as fasCode,
  faCircleNotch as fasCircleNotch,
  faSignOutAlt as fasSignOutAlt,
  faCopyright as fasCopyright
} from '@fortawesome/free-solid-svg-icons';
library.add(fasUnlockAlt, fasHome, fasCogs, fasUser, fasSlidersH, fasUsers, fasCode, fasCircleNotch, fasSignOutAlt, fasCopyright);
/* Regular Icons */
import {} from '@fortawesome/free-regular-svg-icons';
library.add();
/* Brand Icons */
import {} from '@fortawesome/free-brands-svg-icons';
library.add();


/* Components Imports */
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Config Imports */
import { Config } from 'src/app/configs/config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    /* Angular Imports Begin */
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /* Angular Imports End */
    /**/
    /* Angular Material Imports Begin */
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    /* Angular Material Imports End */
    /**/
    /* Fontawesome Imports Begin */
    FontAwesomeModule
    /* Fontaweseom Imports End */
    /**/
    /* Other Imports Begin */
    /* Other Imports End */
  ],
  providers: [
    SidebarComponent,
    Config
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
