import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { map, catchError } from 'rxjs/operators';

import { ApiResponse } from 'src/app/interfaces/api-response';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from '../auth/auth.service';
import { of, Observable, throwError } from 'rxjs';
import { QuotationConfigData } from 'src/app/interfaces/quotation-config-data';
import { QuotationData } from 'src/app/interfaces/quotation-data';

interface API {
  hostname: string;
  basepath: string;
  path: string;
  sendRequest: (...args: any[]) => Observable<ApiResponse>;
}

@Injectable({
  providedIn: 'root'
})
export class HttpTransactionsService {
  private _default_hostname = '';
  private _default_basepath = '/api';

  constructor(private _http_client: HttpClient, private _localstorage_service: LocalStorageService) {}

  get_login: API = {
    hostname: null,
    basepath: null,
    path: '/login',
    sendRequest: (username: string, password: string): Observable<ApiResponse> => {
      const hostname: string = this.get_login.hostname == null ? this._default_hostname : this.get_login.hostname;
      const basepath: string = this.get_login.basepath == null ? this._default_basepath : this.get_login.basepath;
      const url: string = hostname + basepath + this.get_login.path;

      const password_hash = new Md5().appendStr(password).end();

      const headers = new HttpHeaders().set('Authorization', 'Basic ' + btoa(username + ':' + password_hash));
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_login_token: API = {
    hostname: null,
    basepath: null,
    path: '/login/token',
    sendRequest: (): Observable<ApiResponse> => {
      const hostname: string =
        this.get_login_token.hostname == null ? this._default_hostname : this.get_login_token.hostname;
      const basepath: string =
        this.get_login_token.basepath == null ? this._default_basepath : this.get_login_token.basepath;
      const url: string = hostname + basepath + this.get_login_token.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_users: API = {
    hostname: null,
    basepath: null,
    path: '/users',
    sendRequest: (): Observable<ApiResponse> => {
      const hostname: string = this.get_users.hostname == null ? this._default_hostname : this.get_users.hostname;
      const basepath: string = this.get_users.basepath == null ? this._default_basepath : this.get_users.basepath;
      const url: string = hostname + basepath + this.get_users.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  post_users: API = {
    hostname: null,
    basepath: null,
    path: '/users',
    sendRequest: (user_data: UserData): Observable<ApiResponse> => {
      const hostname: string = this.post_users.hostname == null ? this._default_hostname : this.post_users.hostname;
      const basepath: string = this.post_users.basepath == null ? this._default_basepath : this.post_users.basepath;
      const url: string = hostname + basepath + this.post_users.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.post<ApiResponse>(url, user_data, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_users_min: API = {
    hostname: null,
    basepath: null,
    path: '/users/min',
    sendRequest: (): Observable<ApiResponse> => {
      const hostname: string =
        this.get_users_min.hostname == null ? this._default_hostname : this.get_users_min.hostname;
      const basepath: string =
        this.get_users_min.basepath == null ? this._default_basepath : this.get_users_min.basepath;
      const url: string = hostname + basepath + this.get_users_min.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_users_user_id: API = {
    hostname: null,
    basepath: null,
    path: '/users/:user_id',
    sendRequest: (user_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.get_users_user_id.hostname == null ? this._default_hostname : this.get_users_user_id.hostname;
      const basepath: string =
        this.get_users_user_id.basepath == null ? this._default_basepath : this.get_users_user_id.basepath;
      let url: string = hostname + basepath + this.get_users_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  put_users_user_id: API = {
    hostname: null,
    basepath: null,
    path: '/users/:user_id',
    sendRequest: (user_id: string, user_data: UserData): Observable<ApiResponse> => {
      const hostname: string =
        this.put_users_user_id.hostname == null ? this._default_hostname : this.put_users_user_id.hostname;
      const basepath: string =
        this.put_users_user_id.basepath == null ? this._default_basepath : this.put_users_user_id.basepath;
      let url: string = hostname + basepath + this.put_users_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.put<ApiResponse>(url, user_data, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  delete_users_user_id: API = {
    hostname: null,
    basepath: null,
    path: '/users/:user_id',
    sendRequest: (user_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.delete_users_user_id.hostname == null ? this._default_hostname : this.delete_users_user_id.hostname;
      const basepath: string =
        this.delete_users_user_id.basepath == null ? this._default_basepath : this.delete_users_user_id.basepath;
      let url: string = hostname + basepath + this.delete_users_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = {
        headers
      };

      return this._http_client.delete<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  patch_users_user_id_disable: API = {
    hostname: null,
    basepath: null,
    path: '/users/:user_id/disable',
    sendRequest: (user_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.patch_users_user_id_disable.hostname == null
          ? this._default_hostname
          : this.patch_users_user_id_disable.hostname;
      const basepath: string =
        this.patch_users_user_id_disable.basepath == null
          ? this._default_basepath
          : this.patch_users_user_id_disable.basepath;
      let url: string = hostname + basepath + this.patch_users_user_id_disable.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = {
        headers
      };

      return this._http_client.patch<ApiResponse>(url, null, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  patch_users_user_id_enable: API = {
    hostname: null,
    basepath: null,
    path: '/users/:user_id/enable',
    sendRequest: (user_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.patch_users_user_id_enable.hostname == null
          ? this._default_hostname
          : this.patch_users_user_id_enable.hostname;
      const basepath: string =
        this.patch_users_user_id_enable.basepath == null
          ? this._default_basepath
          : this.patch_users_user_id_enable.basepath;
      let url: string = hostname + basepath + this.patch_users_user_id_enable.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = {
        headers
      };

      return this._http_client.patch<ApiResponse>(url, null, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_profile_user_id: API = {
    hostname: null,
    basepath: null,
    path: '/profile/:user_id',
    sendRequest: (user_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.get_profile_user_id.hostname == null ? this._default_hostname : this.get_profile_user_id.hostname;
      const basepath: string =
        this.get_profile_user_id.basepath == null ? this._default_basepath : this.get_profile_user_id.basepath;
      let url: string = hostname + basepath + this.get_profile_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  put_profile_user_id: API = {
    hostname: null,
    basepath: null,
    path: '/profile/:user_id',
    sendRequest: (user_id: string, profile: any): Observable<ApiResponse> => {
      const hostname: string =
        this.put_profile_user_id.hostname == null ? this._default_hostname : this.put_profile_user_id.hostname;
      const basepath: string =
        this.put_profile_user_id.basepath == null ? this._default_basepath : this.put_profile_user_id.basepath;
      let url: string = hostname + basepath + this.put_profile_user_id.path;

      url = url.replace(/:user_id/, user_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.put<ApiResponse>(url, profile, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_quotations: API = {
    hostname: null,
    basepath: null,
    path: '/quotations',
    sendRequest: (): Observable<ApiResponse> => {
      const hostname: string =
        this.get_quotations.hostname == null ? this._default_hostname : this.get_quotations.hostname;
      const basepath: string =
        this.get_quotations.basepath == null ? this._default_basepath : this.get_quotations.basepath;
      const url: string = hostname + basepath + this.get_quotations.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  post_quotations: API = {
    hostname: null,
    basepath: null,
    path: '/quotations',
    sendRequest: (quotation: QuotationData): Observable<ApiResponse> => {
      const hostname: string =
        this.post_quotations.hostname == null ? this._default_hostname : this.post_quotations.hostname;
      const basepath: string =
        this.post_quotations.basepath == null ? this._default_basepath : this.post_quotations.basepath;
      const url: string = hostname + basepath + this.post_quotations.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };

      return this._http_client.post<ApiResponse>(url, quotation, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  put_quotations_quotation_id: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/:quotation_id',
    sendRequest: (quotation_id: string, quotation: QuotationData): Observable<ApiResponse> => {
      const hostname: string =
        this.put_quotations_quotation_id.hostname == null
          ? this._default_hostname
          : this.put_quotations_quotation_id.hostname;
      const basepath: string =
        this.put_quotations_quotation_id.basepath == null
          ? this._default_basepath
          : this.put_quotations_quotation_id.basepath;
      const url: string =
        hostname + basepath + this.put_quotations_quotation_id.path.replace(':quotation_id', quotation_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };

      return this._http_client.put<ApiResponse>(url, quotation, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  delete_quotations_quotation_id: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/:quotation_id',
    sendRequest: (quotation_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.delete_quotations_quotation_id.hostname == null
          ? this._default_hostname
          : this.delete_quotations_quotation_id.hostname;
      const basepath: string =
        this.delete_quotations_quotation_id.basepath == null
          ? this._default_basepath
          : this.delete_quotations_quotation_id.basepath;
      let url: string = hostname + basepath + this.delete_quotations_quotation_id.path;

      url = url.replace(/:quotation_id/, quotation_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = {
        headers
      };

      return this._http_client.delete<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  patch_quotations_quotation_id_disable: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/:quotation_id/disable',
    sendRequest: (quotation_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.patch_quotations_quotation_id_disable.hostname == null
          ? this._default_hostname
          : this.patch_quotations_quotation_id_disable.hostname;
      const basepath: string =
        this.patch_quotations_quotation_id_disable.basepath == null
          ? this._default_basepath
          : this.patch_quotations_quotation_id_disable.basepath;
      let url: string = hostname + basepath + this.patch_quotations_quotation_id_disable.path;

      url = url.replace(/:quotation_id/, quotation_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = {
        headers
      };

      return this._http_client.patch<ApiResponse>(url, null, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  patch_quotations_quotation_id_enable: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/:quotation_id/enable',
    sendRequest: (quotation_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.patch_quotations_quotation_id_enable.hostname == null
          ? this._default_hostname
          : this.patch_quotations_quotation_id_enable.hostname;
      const basepath: string =
        this.patch_quotations_quotation_id_enable.basepath == null
          ? this._default_basepath
          : this.patch_quotations_quotation_id_enable.basepath;
      let url: string = hostname + basepath + this.patch_quotations_quotation_id_enable.path;

      url = url.replace(/:quotation_id/, quotation_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = {
        headers
      };

      return this._http_client.patch<ApiResponse>(url, null, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_quotations_configs: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/configs',
    sendRequest: (): Observable<ApiResponse> => {
      const hostname: string =
        this.get_quotations_configs.hostname == null ? this._default_hostname : this.get_quotations_configs.hostname;
      const basepath: string =
        this.get_quotations_configs.basepath == null ? this._default_basepath : this.get_quotations_configs.basepath;
      const url: string = hostname + basepath + this.get_quotations_configs.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  post_quotations_configs: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/configs',
    sendRequest: (config: QuotationConfigData): Observable<ApiResponse> => {
      const hostname: string =
        this.post_quotations_configs.hostname == null ? this._default_hostname : this.post_quotations_configs.hostname;
      const basepath: string =
        this.post_quotations_configs.basepath == null ? this._default_basepath : this.post_quotations_configs.basepath;
      const url: string = hostname + basepath + this.post_quotations_configs.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };

      return this._http_client.post<ApiResponse>(url, config, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  get_quotations_configs_active: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/configs/active',
    sendRequest: (): Observable<ApiResponse> => {
      const hostname: string =
        this.get_quotations_configs_active.hostname == null
          ? this._default_hostname
          : this.get_quotations_configs_active.hostname;
      const basepath: string =
        this.get_quotations_configs_active.basepath == null
          ? this._default_basepath
          : this.get_quotations_configs_active.basepath;
      const url: string = hostname + basepath + this.get_quotations_configs_active.path;

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };
      return this._http_client.get<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  put_quotations_configs_config_id: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/configs/:config_id',
    sendRequest: (config_id: string, config: QuotationConfigData): Observable<ApiResponse> => {
      const hostname: string =
        this.put_quotations_configs_config_id.hostname == null
          ? this._default_hostname
          : this.put_quotations_configs_config_id.hostname;
      const basepath: string =
        this.put_quotations_configs_config_id.basepath == null
          ? this._default_basepath
          : this.put_quotations_configs_config_id.basepath;
      const url: string =
        hostname + basepath + this.put_quotations_configs_config_id.path.replace(':config_id', config_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };

      return this._http_client.put<ApiResponse>(url, config, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  delete_quotations_configs_config_id: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/configs/:config_id',
    sendRequest: (config_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.delete_quotations_configs_config_id.hostname == null
          ? this._default_hostname
          : this.delete_quotations_configs_config_id.hostname;
      const basepath: string =
        this.delete_quotations_configs_config_id.basepath == null
          ? this._default_basepath
          : this.delete_quotations_configs_config_id.basepath;
      const url: string =
        hostname + basepath + this.delete_quotations_configs_config_id.path.replace(':config_id', config_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };

      return this._http_client.delete<ApiResponse>(url, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  patch_quotations_configs_config_id_enable: API = {
    hostname: null,
    basepath: null,
    path: '/quotations/configs/:config_id/enable',
    sendRequest: (config_id: string): Observable<ApiResponse> => {
      const hostname: string =
        this.patch_quotations_configs_config_id_enable.hostname == null
          ? this._default_hostname
          : this.patch_quotations_configs_config_id_enable.hostname;
      const basepath: string =
        this.patch_quotations_configs_config_id_enable.basepath == null
          ? this._default_basepath
          : this.patch_quotations_configs_config_id_enable.basepath;
      const url: string =
        hostname + basepath + this.patch_quotations_configs_config_id_enable.path.replace(':config_id', config_id);

      const token = this._localstorage_service.get(this._localstorage_service.lsname.token);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const http_options = { headers };

      return this._http_client.patch<ApiResponse>(url, null, http_options).pipe(
        map(response => {
          if (response.token) {
            this._set_token(response.token);
          }
          return response;
        }),
        catchError(this._errorHandler<ApiResponse>())
      );
    }
  };

  private _set_token(token: string): void {
    this._localstorage_service.set(this._localstorage_service.lsname.token, token);
  }

  private _errorHandler<T>() {
    return (err: any): Observable<T> => {
      if (err.error.token) {
        this._set_token(err.error.token);
      }

      return throwError(err);
    };
  }
}
