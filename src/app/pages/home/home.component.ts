import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from 'src/app/configs/config';
import { HeaderService } from 'src/app/services/header/header.service';
import { FormControl, Validators } from '@angular/forms';
import * as $ from 'jquery';

import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { CookieService } from 'src/app/services/cookie/cookie.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/* Interfaces Imports */
import { MatSnackBar } from '@angular/material/snack-bar';
// import { PageMap } from 'src/app/interfaces/page-map';


const APP_ID = 'home';

interface Mode {
  password_visible: boolean;
  logging_in: boolean;
}

interface PageMapWithHover {
  path: string;
  identifier: string;
  name: string;
  img_icon_theme: string;
  img_icon_white: string;
  fas_icon: string;
  hovered: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private app_id = APP_ID;
  config: Config = new Config();

  mode: Mode = {
    password_visible: false,
    logging_in: false
  };

  bookmarked_apps: PageMapWithHover[] = [];
  my_apps: PageMapWithHover[] = [];

  constructor(
    private title: Title,
    private toast: MatSnackBar,
    private header_service: HeaderService,
    private sidebar: SidebarComponent,
    private localstorage_service: LocalStorageService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.config.page_map[this.app_id].name + ' - ' + this.config.app_title);
    this.header_service.changePageInfo(
      this.config.page_map[this.app_id].identifier,
      this.config.page_map[this.app_id].name,
      this.config.page_map[this.app_id].fas_icon
    );

    this.sidebar.activate();
    this.sidebar.colorize(this.config.page_map[this.app_id].identifier);

    const app_permissions = JSON.parse(this.localstorage_service.get(this.localstorage_service.lsname.app_permissions));
    console.log(app_permissions);

    for (let app of app_permissions) {
      const temp_app = this.config.page_map[app.app];
      temp_app.hovered = false;
      this.my_apps.push(temp_app);
    }

    this.my_apps.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }

  onCardMouseOver(index: number) {
    this.my_apps[index].hovered = true;
  }

  onCardMouseOut(index: number) {
    this.my_apps[index].hovered = false;
  }

  bookmarkApp(index: number, event: Event) {
    event.stopPropagation();
    if (this.bookmarked_apps.indexOf(this.my_apps[index]) < 0) {
      this.bookmarked_apps.push(this.my_apps[index]);
    } else {
      this.bookmarked_apps.splice(this.bookmarked_apps.indexOf(this.my_apps[index]), 1);
    }
    console.log(this.bookmarked_apps);
  }

  showToast(message: string, action: string, duration: number = null, is_error: boolean = true) {
    if (duration == null) {
      this.toast.open(message, action, {
        horizontalPosition: 'end',
        panelClass: [is_error ? 'toast-error' : '']
      });
    } else {
      this.toast.open(message, action, {
        horizontalPosition: 'end',
        duration,
        panelClass: [is_error ? 'toast-error' : '']
      });
    }
  }

  stringify(obj: object) {
    return JSON.stringify(obj, null, 4);
  }

}
