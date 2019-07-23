import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

/* Component Imports */
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { HeaderService } from 'src/app/services/header/header.service';

/* Config Imports */
import { Config } from 'src/app/configs/config';

interface PageMapWithHover {
  path: string;
  identifier: string;
  name: string;
  img_icon_theme: string;
  img_icon_white: string;
  fas_icon: string;
  hovered: boolean;
}

const PAGE_ID = 'settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private page_id = PAGE_ID;
  config: Config = new Config();

  apps: PageMapWithHover[] = [];
  constructor(
    private title: Title,
    private toast: MatSnackBar,
    private header_service: HeaderService,
    private sidebar: SidebarComponent,
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

    for (let app_name of this.config.pages) {
      if (app_name.indexOf('settings-') === 0) {
        const temp_app = JSON.parse(JSON.stringify(this.config.page_map[app_name]));
        temp_app.hovered = false;
        this.apps.push(temp_app);
      }
    }
  }

}
