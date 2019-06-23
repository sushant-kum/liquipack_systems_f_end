import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material Imports */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(fas);

/* Components Imports */
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { Error404Component } from 'src/app/errors/error404/error404.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { Config } from 'src/app/configs/config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    Error404Component,
    HomeComponent
  ],
  imports: [
    /* Angular Imports Begin */
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* Angular Imports End */
    /**/
    /* Angular Material Imports Begin */
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
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
