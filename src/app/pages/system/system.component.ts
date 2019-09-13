import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

/* Component Imports */
import { SidebarComponent } from "src/app/components/sidebar/sidebar.component";

/* Services Imports */
import { HeaderService } from "src/app/services/header/header.service";

/* Config Imports */
import { Config } from "src/app/configs/config";

interface PageMapWithHover {
  path: string;
  identifier: string;
  name: string;
  img_icon_theme: string;
  img_icon_white: string;
  fas_icon: string;
  hovered: boolean;
}

const PAGE_ID = "system";

@Component({
  selector: "app-system",
  templateUrl: "./system.component.html",
  styleUrls: ["./system.component.scss"]
})
export class SystemComponent implements OnInit {
  private _page_id = PAGE_ID;
  config: Config = new Config();

  apps: PageMapWithHover[] = [];

  constructor(
    private _title: Title,
    private _header_service: HeaderService,
    public sidebar: SidebarComponent
  ) {}

  ngOnInit() {
    this._title.setTitle(
      this.config.page_map[this._page_id].name + " - " + this.config.app_title
    );
    this._header_service.changePageInfo(
      this.config.page_map[this._page_id].identifier,
      this.config.page_map[this._page_id].name,
      this.config.page_map[this._page_id].fas_icon
    );

    this.sidebar.activate();
    this.sidebar.colorize(this.config.page_map[this._page_id].identifier);

    for (const app_name of this.config.pages) {
      if (app_name.indexOf("system-") === 0) {
        const temp_app = JSON.parse(
          JSON.stringify(this.config.page_map[app_name])
        );
        temp_app.hovered = false;
        this.apps.push(temp_app);
      }
    }
  }
}
