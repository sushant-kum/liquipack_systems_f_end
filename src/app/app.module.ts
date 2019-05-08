import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Angular Material Imports */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDividerModule,
  MatCardModule
} from '@angular/material';

/* Fontawesome Imports */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(fas);

/* Components Imports */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './errors/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { Config } from './configs/config';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
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
