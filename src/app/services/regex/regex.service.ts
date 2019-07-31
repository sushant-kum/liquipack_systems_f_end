import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {
  private _phone: RegExp = /[1-9][0-9]{9}/;

  constructor() { }

  get phone(): RegExp {
    return this._phone;
  }
}
