import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PageInfo } from 'src/app/interfaces/page-info'

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private page_info: BehaviorSubject<PageInfo> = new BehaviorSubject({
    id: '',
    name: 'Loading App',
    fas_icon: 'circle-notch'
  });
  current_page_info = this.page_info.asObservable();

  constructor() { }

  changePageInfo(id: string, name: string, fas_icon: any) {
    this.page_info.next({
      id,
      name,
      fas_icon
    });
  }
}
