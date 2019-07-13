import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

/* Component Imports */
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { CookieService } from 'src/app/services/cookie/cookie.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { HeaderService } from 'src/app/services/header/header.service';

/* Config Imports */
import { Config } from 'src/app/configs/config';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {
  config: Config = new Config();

  constructor(
    private title: Title,
    private toast: MatSnackBar,
    private header_service: HeaderService,
    private sidebar: SidebarComponent,
    private localstorage_service: LocalStorageService,
    private cookie_service: CookieService
  ) { }

  ngOnInit() {
    this.title.setTitle('About the Developer' + ' - ' + this.config.app_title);
    this.header_service.changePageInfo(
      'developer',
      'About the Developer',
      'code'
    );

    this.sidebar.activate();
    this.sidebar.colorize();
  }

}
