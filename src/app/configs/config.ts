export class Config {
    private _app_title = 'Liquipack Workflow';
    private _api_base_path = '/api';
    private _app_base_path = '';
    private _page_map = {
        login : {
            path: this._app_base_path + '/login',
            identifier: 'login',
            name: 'Login',
            img_icon_theme: null,
            img_icon_white: null,
            fas_icon: 'unlock-alt'
        },
        home : {
            path: this._app_base_path + '/home',
            identifier: 'home',
            name: 'Home',
            img_icon_theme: 'assets/images/icons/icon_home_theme.png',
            img_icon_white: 'assets/images/icons/icon_home_white.png',
            fas_icon: 'home'
        },
        settings: {
            path: this._app_base_path + '/settings',
            identifier: 'settings',
            name: 'Settings',
            img_icon_theme: 'assets/images/icons/icon_settings_theme.png',
            img_icon_white: 'assets/images/icons/icon_settings_white.png',
            fas_icon: 'cogs'
        },
        'settings-profile': {
            path: this._app_base_path + '/settings/profile',
            identifier: 'settings-profile',
            name: 'Settings/Profile',
            img_icon_theme: 'assets/images/icons/icon_settings-profile_theme.png',
            img_icon_white: 'assets/images/icons/icon_settings-profile_white.png',
            fas_icon: 'user'
        },
        system: {
            path: this._app_base_path + '/system',
            identifier: 'system',
            name: 'System',
            img_icon_theme: 'assets/images/icons/icon_system_theme.png',
            img_icon_white: 'assets/images/icons/icon_system_white.png',
            fas_icon: 'sliders-h'
        },
        'system-users': {
            path: this._app_base_path + '/system/users',
            identifier: 'system-users',
            name: 'System/Users',
            img_icon_theme: 'assets/images/icons/icon_system-users_theme.png',
            img_icon_white: 'assets/images/icons/icon_system-users_white.png',
            fas_icon: 'users'
        }
    };
    private _global_apps = [
        {
            app: this._page_map.home,
            permissions: ['read', 'write']
        },
        {
            app: this._page_map.settings,
            permissions: ['read', 'write']
        },
        {
            app: this._page_map['settings-profile'],
            permissions: ['read', 'write']
        },
    ]

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
