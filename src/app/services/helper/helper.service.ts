import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  time = {
    format(date: moment.Moment, format: string): string {
      return moment(date).format(format);
    }
  };

  json = {
    stringify(obj: object): string {
      return JSON.stringify(obj);
    }
  };

  object = {
    Keys(obj: object): string[] {
      return Object.keys(obj);
    }
  };
}
