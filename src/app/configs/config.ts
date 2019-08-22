export class Config {
  private _app_title = 'Liquipack Workflow';
  private _api_base_path = '/api';
  private _app_base_path = '';
  private _pages = [
    'login',
    'home',
    'apps',
    'apps-quotation',
    'apps-quotation-config',
    'settings',
    'settings-profile',
    'system',
    'system-users'
  ];
  private _page_map = {
    login: {
      path: this._app_base_path + '/login',
      identifier: 'login',
      name: 'Login',
      short_name: 'Login',
      img_icon_theme: null,
      img_icon_white: null,
      fas_icon: 'unlock-alt',
      is_subpage: false,
      parent_page: null
    },
    home: {
      path: this._app_base_path + '/home',
      identifier: 'home',
      name: 'Home',
      short_name: 'Home',
      img_icon_theme: 'assets/images/icons/apps/icon_home_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icon_home_white.svg',
      fas_icon: 'home',
      is_subpage: false,
      parent_page: null
    },
    settings: {
      path: this._app_base_path + '/settings',
      identifier: 'settings',
      name: 'Settings',
      short_name: 'Settings',
      img_icon_theme: 'assets/images/icons/apps/icon_settings_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icon_settings_white.svg',
      fas_icon: 'cogs',
      is_subpage: false,
      parent_page: null
    },
    'settings-profile': {
      path: this._app_base_path + '/settings/profile',
      identifier: 'settings-profile',
      name: 'Settings/Profile',
      short_name: 'Profile',
      img_icon_theme: 'assets/images/icons/apps/icon_settings-profile_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icon_settings-profile_white.svg',
      fas_icon: 'user',
      is_subpage: true,
      parent_page: 'settings'
    },
    system: {
      path: this._app_base_path + '/system',
      identifier: 'system',
      name: 'System',
      short_name: 'System',
      img_icon_theme: 'assets/images/icons/apps/icon_system_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icon_system_white.svg',
      fas_icon: 'sliders-h',
      is_subpage: false,
      parent_page: null
    },
    'system-users': {
      path: this._app_base_path + '/system/users',
      identifier: 'system-users',
      name: 'System/Users',
      short_name: 'Users',
      img_icon_theme: 'assets/images/icons/apps/icon_system-users_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icon_system-users_white.svg',
      fas_icon: 'users',
      is_subpage: true,
      parent_page: 'system'
    },
    apps: {
      path: this._app_base_path + '/apps',
      identifier: 'apps',
      name: 'Apps',
      short_name: 'Apps',
      img_icon_theme: 'assets/images/icons/apps/icon_apps_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icon_apps_white.svg',
      fas_icon: 'th-list',
      is_subpage: false,
      parent_page: null
    },
    'apps-quotation': {
      path: this._app_base_path + '/apps/quotation',
      identifier: 'apps-quotation',
      name: 'Apps/Quotation',
      short_name: 'Quotation',
      img_icon_theme: 'assets/images/icons/apps/icon_apps-quotation_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icon_apps-quotation_white.svg',
      fas_icon: 'file-invoice',
      is_subpage: true,
      parent_page: 'apps'
    },
    'apps-quotation-config': {
      path: this._app_base_path + '/apps/quotation/config',
      identifier: 'apps-quotation-config',
      name: 'Apps/Quotation/Config',
      short_name: 'Quotation-Config',
      img_icon_theme: 'assets/images/icons/apps/icons_apps-quotation-config_theme.svg',
      img_icon_white: 'assets/images/icons/apps/icons_apps-quotation-config_white.svg',
      fas_icon: 'tools',
      is_subpage: true,
      parent_page: 'apps'
    }
  };
  private _global_apps = [
    {
      identifier: 'home',
      app: this._page_map.home,
      permissions: ['read', 'write']
    },
    {
      identifier: 'settings',
      app: this._page_map.settings,
      permissions: ['read', 'write']
    },
    {
      identifier: 'settings-profile',
      app: this._page_map['settings-profile'],
      permissions: ['read', 'write']
    },
  ];

  private _default_app_path = this._app_base_path + '/home';

  get app_title() {
    return this._app_title;
  }

  get api_base_path() {
    return this._api_base_path;
  }

  get app_base_path() {
    return this._app_base_path;
  }

  get pages() {
    return this._pages;
  }

  get page_map() {
    return this._page_map;
  }

  get default_app_path() {
    return this._default_app_path;
  }

  get global_apps() {
    return this._global_apps;
  }
}
