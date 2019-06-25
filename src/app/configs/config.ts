export class Config {
    private _app_title = 'Liquipack Workflow';
    private _api_base_path = '/api';
    private _app_base_path = '';
    private _pages = [
        'login',
        'home',
        'settings',
        'settings-profile',
        'system',
        'system-users'
    ]
    private _page_map = {
        login : {
            path: this._app_base_path + '/login',
            identifier: 'login',
            name: 'Login',
            short_name: 'Login',
            img_icon_theme: null,
            img_icon_white: null,
            fas_icon: 'unlock-alt',
            is_subpage: false
        },
        home : {
            path: this._app_base_path + '/home',
            identifier: 'home',
            name: 'Home',
            short_name: 'Home',
            img_icon_theme: 'assets/images/icons/icon_home_theme.png',
            img_icon_white: 'assets/images/icons/icon_home_white.png',
            fas_icon: 'home',
            is_subpage: false
        },
        settings: {
            path: this._app_base_path + '/settings',
            identifier: 'settings',
            name: 'Settings',
            short_name: 'Settings',
            img_icon_theme: 'assets/images/icons/icon_settings_theme.png',
            img_icon_white: 'assets/images/icons/icon_settings_white.png',
            fas_icon: 'cogs',
            is_subpage: false
        },
        'settings-profile': {
            path: this._app_base_path + '/settings/profile',
            identifier: 'settings-profile',
            name: 'Settings/Profile',
            short_name: 'Profile',
            img_icon_theme: 'assets/images/icons/icon_settings-profile_theme.png',
            img_icon_white: 'assets/images/icons/icon_settings-profile_white.png',
            fas_icon: 'user',
            is_subpage: true
        },
        system: {
            path: this._app_base_path + '/system',
            identifier: 'system',
            name: 'System',
            short_name: 'System',
            img_icon_theme: 'assets/images/icons/icon_system_theme.png',
            img_icon_white: 'assets/images/icons/icon_system_white.png',
            fas_icon: 'sliders-h',
            is_subpage: false
        },
        'system-users': {
            path: this._app_base_path + '/system/users',
            identifier: 'system-users',
            name: 'System/Users',
            short_name: 'Users',
            img_icon_theme: 'assets/images/icons/icon_system-users_theme.png',
            img_icon_white: 'assets/images/icons/icon_system-users_white.png',
            fas_icon: 'users',
            is_subpage: true
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
