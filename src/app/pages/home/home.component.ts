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

/* Interfaces Imports */
// import { PageMap } from 'src/app/interfaces/page-map';


const PAGE_ID = 'home';

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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private page_id = PAGE_ID;
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
    private localstorage_service: LocalStorageService,
    private cookie_service: CookieService
  ) { }

  ngOnInit() {
    this.title.setTitle(this.config.page_map[this.page_id].name + ' - ' + this.config.app_title);
    this.header_service.changePageInfo(
      this.config.page_map[this.page_id].identifier,
      this.config.page_map[this.page_id].name,
      this.config.page_map[this.page_id].fas_icon
    );

    this.sidebar.activate();
    this.sidebar.colorize(this.config.page_map[this.page_id].identifier);

    const app_permissions = JSON.parse(this.localstorage_service.get(this.localstorage_service.lsname.app_permissions));

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

    try {
      let bookmarked_apps_identifier_arr = JSON.parse(this.cookie_service.get(this.cookie_service.cname.bookmarked_apps));
      for (let bookmarked_apps_identifier of bookmarked_apps_identifier_arr) {
        for(let my_app of this.my_apps) {
          if(bookmarked_apps_identifier == my_app.identifier) {
            this.bookmarked_apps.push(my_app);
            break;
          }
        }
      }
    } catch(err) {
      console.error(err);
      this.bookmarked_apps = []
    }
    
  }

  onCardMouseOver(index: number) {
    this.my_apps[index].hovered = true;
  }

  onCardMouseOut(index: number) {
    this.my_apps[index].hovered = false;
  }

  toggleBookmarkApp(index: number, event: Event) {
    event.stopPropagation();
    if (this.bookmarked_apps.indexOf(this.my_apps[index]) < 0) {
      this.bookmarked_apps.push(this.my_apps[index]);
    } else {
      this.bookmarked_apps.splice(this.bookmarked_apps.indexOf(this.my_apps[index]), 1);
    }

    let bookmarked_apps_identifier_arr: string[] = [];
    for (let bookmarked_app of this.bookmarked_apps) {
      bookmarked_apps_identifier_arr.push(bookmarked_app.identifier)
    }
    if(bookmarked_apps_identifier_arr.length >= 1)
      this.cookie_service.set(this.cookie_service.cname.bookmarked_apps, JSON.stringify(bookmarked_apps_identifier_arr), 15);
    else
      this.cookie_service.delete(this.cookie_service.cname.bookmarked_apps);
    console.log('this.bookmarked_apps', this.bookmarked_apps);
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
