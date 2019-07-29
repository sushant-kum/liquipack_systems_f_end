import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

/* Component Imports */
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

/* Services Imports */
import { HeaderService } from 'src/app/services/header/header.service';

/* Config Imports */
import { Config } from 'src/app/configs/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const PAGE_ID = 'settings-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private page_id = PAGE_ID;
  config: Config = new Config();

  form_profile: FormGroup = new FormGroup({
    username: new FormControl({value: 'admin', disabled: true}, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  constructor(
    private title: Title,
    private toast: MatSnackBar,
    private header_service: HeaderService,
    private sidebar: SidebarComponent,
  ) { }

  ngOnInit() {
    console.log(this.page_id);
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
