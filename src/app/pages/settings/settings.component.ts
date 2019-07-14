import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

/* Component Imports */
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { HeaderService } from 'src/app/services/header/header.service';

/* Config Imports */
import { Config } from 'src/app/configs/config';

const PAGE_ID = 'settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private page_id = PAGE_ID;
  config: Config = new Config();

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
  }

}
