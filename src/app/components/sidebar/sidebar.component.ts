import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

/* Service Imports */
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieService } from 'src/app/services/cookie/cookie.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

/* Class Imports */
import { Config } from 'src/app/configs/config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  config: Config = new Config();

  constructor(
    private auth_service: AuthService,
    private cookie_service: CookieService,
    private localstorage_service: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  activate() {
    if (window.innerWidth <= 700) {
      this.cookie_service.set(this.cookie_service.cname.sidebar_collapsed, 'true');
    }

    if (this.cookie_service.get(this.cookie_service.cname.sidebar_collapsed) === 'true') {
      this.collapseSidebar();
    } else {
      this.uncollapseSidebar();
    }
    document.getElementById('app-sidebar').classList.remove('w3-hide');

    this.activateRippleEffect();
    this.showMenuItems();
  }

  destroy() {
    document.getElementById('app-sidebar').classList.add('w3-hide');
  }

  activateRippleEffect() {
    const $ripple = $('.js-ripple');
    $ripple.on('click.ui.ripple', function (e) {
      const $this = $(this);
      const $offset = $this.parent().offset();
      const $circle = $this.find('.c-ripple__circle');

      const x = e.pageX - $offset.left;
      const y = e.pageY - $offset.top;

      $circle.css({
        top: y + 'px',
        left: x + 'px'
      });

      $this.addClass('is-active');
    });
    $ripple.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function (e) {
      $(this).removeClass('is-active');
    });
  }

  redirectTo(path, timeout = 0, router_path: boolean = false, absolute_path: boolean = false) {
    const url = absolute_path ? path : this.config.app_base_path + path;
    if (router_path) {
      this.router.navigate([path])
    } else {
      setTimeout(() => {
        window.location.href = url;
      }, timeout);
    }
  }

  showMenuItems() {
    const user_id = this.localstorage_service.get(this.localstorage_service.lsname.user_id);
    this.auth_service.get_access(user_id, (error, data) => {
      if (error) {
        console.error(error);
        this.localstorage_service.deleteAll();
        window.location.href = this.config.page_map.login.path;
      } else {
        const menuitems = document.getElementsByClassName('menuitem');
        for (let i = 0; i < menuitems.length; i++) {
          menuitems[i].classList.add('w3-hide');
          if (menuitems[i].getAttribute('data-menuitem') !== 'login') {
            for (let access of data.access) {
              if (menuitems[i].getAttribute('data-menuitem') === access.app) {
                menuitems[i].classList.remove('w3-hide');
              }
            }
          }
        }
        this.localstorage_service.set(this.localstorage_service.lsname.token, data.token);
        this.localstorage_service.set(this.localstorage_service.lsname.app_permissions, JSON.stringify(data.access));
      }
    });
  }

  colorize(menu_name: string = null) {
    const menuitems = document.getElementsByClassName('menuitem');
    for (let i = 0; i < menuitems.length; i++) {
      menuitems[i].classList.remove('w3-text-theme-primary');
      menuitems[i].classList.remove('bg-white');
      if (menuitems[i].getAttribute('data-menuitem') === menu_name) {
        menuitems[i].classList.add('w3-text-theme-primary');
        menuitems[i].classList.add('bg-white');
      }
    }
  }

  logout() {
    this.localstorage_service.deleteAll();
    window.location.href = this.config.app_base_path;
  }

  toggleSidebarCollapse() {
    const hamburger = document.getElementsByClassName('hamburger')[0];
    if (hamburger.classList.contains('is-active')) {
      this.collapseSidebar();
    } else {
      this.uncollapseSidebar();
    }
  }

  uncollapseSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('sidebar-collapsed');
    // sidebar.classList.add("w3-show");
    const sidebar_collapsed = document.getElementById('sidebar-collapsed');
    sidebar_collapsed.classList.remove('w3-show');
    sidebar_collapsed.classList.add('w3-hide');
    // let logo_holder_collapsed = document.getElementById("logo-holder-collapsed");
    // logo_holder_collapsed.classList.remove("w3-show");
    // logo_holder_collapsed.classList.add("w3-hide");
    const btn_sidebar_toggle = document.getElementById('btn-sidebar-toggle');
    btn_sidebar_toggle.classList.remove('sidebar-collapsed');
    const hamburger = document.getElementsByClassName('hamburger')[0];
    hamburger.classList.add('is-active');
    if (window.innerWidth > 700) {
      const content = $('.content')[0];
      content.style.marginLeft = '200px';
    }
    const logout = document.getElementById('logout');
    logout.classList.remove('sidebar-collapsed');
    this.cookie_service.set(this.cookie_service.cname.sidebar_collapsed, false.toString());
  }

  collapseSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.add('sidebar-collapsed');
    // sidebar.classList.add("w3-hide");
    setTimeout(() => {
      const sidebar_collapsed = document.getElementById('sidebar-collapsed');
      sidebar_collapsed.classList.remove('w3-hide');
      sidebar_collapsed.classList.add('w3-show');
    }, 150);
    // let logo_holder_collapsed = document.getElementById("logo-holder-collapsed");
    // logo_holder_collapsed.classList.remove("w3-hide");
    // logo_holder_collapsed.classList.add("w3-show");
    const btn_sidebar_toggle = document.getElementById('btn-sidebar-toggle');
    btn_sidebar_toggle.classList.add('sidebar-collapsed');
    const hamburger = document.getElementsByClassName('hamburger')[0];
    hamburger.classList.remove('is-active');
    if (window.innerWidth > 700) {
      const content = $('.content')[0];
      content.style.marginLeft = '50px';
    }
    const logout = document.getElementById('logout');
    logout.classList.add('sidebar-collapsed');
    this.cookie_service.set(this.cookie_service.cname.sidebar_collapsed, true.toString());
  }

  getToggleButtonTooltipContent() {
    const hamburger = document.getElementsByClassName('hamburger')[0];
    if (hamburger.classList.contains('is-active')) {
      return 'Hide Menu';
    } else {
      return 'Show Menu';
    }
  }
}
