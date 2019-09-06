import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {
  private _phone: RegExp = /[1-9][0-9]{9}/;
  private _username: RegExp = /^(?=.{2,50}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+[a-z0-9]$/;
  private _quotation_config_name: RegExp = /^(?=.{2,50}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+[a-z0-9]$/;

  constructor() { }

  get phone(): RegExp {
    return this._phone;
  }

  get username(): RegExp {
    return this._username;
  }

  get quotation_config_name(): RegExp {
    return this._quotation_config_name;
  }


}
