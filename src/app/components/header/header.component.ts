import { Component, OnInit } from '@angular/core';

import { PageInfo } from 'src/app/interfaces/page-info';
import { HeaderService } from 'src/app/services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  page_info: PageInfo;

  constructor(
    private header_service: HeaderService
  ) { }

  ngOnInit() {
    this.header_service.current_page_info.subscribe(
      (page_info: PageInfo) => {
        this.page_info = page_info;
      }
    );
  }

}
