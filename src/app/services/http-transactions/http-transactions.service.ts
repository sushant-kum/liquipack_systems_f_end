import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { map } from 'rxjs/operators';

import { ApiResponse } from 'src/app/interfaces/api-response';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserData } from 'src/app/interfaces/user-data';

interface API {
  hostname: string;
  basepath: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  sendRequest: any;
}

@Injectable({
  providedIn: 'root'
})
export class HttpTransactionsService {
  private _default_hostname = '';
  private _default_basepath = '/api';

  constructor(
    private _http_client: HttpClient,
    private _localstorage_service: LocalStorageService
  ) { }

  get_login: API = {
    hostname: null,
    basepath: null,
    method: 'GET',
    path: '/login',
    sendRequest: (username: string, password: string) => {
      const hostname: string = this.get_login.hostname == null ? this._default_hostname : this.get_login.hostname;
      const basepath: string = this.get_login.basepath == null ? this._default_basepath : this.get_login.basepath;
      const url: string = hostname + basepath + this.get_login.path;

      const password_hash = new Md5().appendStr(password).end();

      const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(username + ':' + password_hash));
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map((response) => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        })
      );
    }
  };

  get_login_token: API = {
    hostname: null,
    basepath: null,
    method: 'GET',
    path: '/login/token',
    sendRequest: () => {
      const hostname: string = this.get_login_token.hostname == null ? this._default_hostname : this.get_login_token.hostname;
      const basepath: string = this.get_login_token.basepath == null ? this._default_basepath : this.get_login_token.basepath;
      const url: string = hostname + basepath + this.get_login_token.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map((response) => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        })
      );
    }
  };

  get_users: API = {
    hostname: null,
    basepath: null,
    method: 'GET',
    path: '/users',
    sendRequest: () => {
      const hostname: string = this.get_users.hostname == null ? this._default_hostname : this.get_users.hostname;
      const basepath: string = this.get_users.basepath == null ? this._default_basepath : this.get_users.basepath;
      const url: string = hostname + basepath + this.get_users.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map((response) => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        })
      );
    }
  };

  get_users_user_id: API = {
    hostname: null,
    basepath: null,
    method: 'GET',
    path: '/users/:user_id',
    sendRequest: (user_id: string) => {
      const hostname: string = this.get_users_user_id.hostname == null ? this._default_hostname : this.get_users_user_id.hostname;
      const basepath: string = this.get_users_user_id.basepath == null ? this._default_basepath : this.get_users_user_id.basepath;
      let url: string = hostname + basepath + this.get_users_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map((response) => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        })
      );
    }
  };

  put_users_user_id: API = {
    hostname: null,
    basepath: null,
    method: 'PUT',
    path: '/users/:user_id',
    sendRequest: (user_id: string, user_data: UserData) => {
      const hostname: string = this.put_users_user_id.hostname == null ? this._default_hostname : this.put_users_user_id.hostname;
      const basepath: string = this.put_users_user_id.basepath == null ? this._default_basepath : this.put_users_user_id.basepath;
      let url: string = hostname + basepath + this.put_users_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.put<ApiResponse>(url, user_data, http_options).pipe(
        map((response) => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        })
      );
    }
  };

  get_profile_user_id: API = {
    hostname: null,
    basepath: null,
    method: 'GET',
    path: '/profile/:user_id',
    sendRequest: (user_id: string) => {
      const hostname: string = this.get_profile_user_id.hostname == null ? this._default_hostname : this.get_profile_user_id.hostname;
      const basepath: string = this.get_profile_user_id.basepath == null ? this._default_basepath : this.get_profile_user_id.basepath;
      let url: string = hostname + basepath + this.get_profile_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map((response) => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        })
      );
    }
  };

  put_profile_user_id: API = {
    hostname: null,
    basepath: null,
    method: 'PUT',
    path: '/profile/:user_id',
    sendRequest: (user_id: string, profile: any) => {
      const hostname: string = this.put_profile_user_id.hostname == null ? this._default_hostname : this.put_profile_user_id.hostname;
      const basepath: string = this.put_profile_user_id.basepath == null ? this._default_basepath : this.put_profile_user_id.basepath;
      let url: string = hostname + basepath + this.put_profile_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.put<ApiResponse>(url, profile, http_options).pipe(
        map((response) => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        })
      );
    }
  };

  private _set_token(token: string) {
    this._localstorage_service.set(this._localstorage_service.lsname.token, token);
  }
}
