import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuotationGeneralService {
  private _quotation_item_names: { [key: string]: string } = {
    speed: 'Speed in BPM',
    no_of_washes: 'Number of Washes',
    industry: 'Industry',
    gmp_requirement: 'GMP Requirment (contact part-S.S.316)',
    bottle_moc: 'Bottle MOC',
    water_saving: 'Water Saving',
    filters_required: 'Filters Required',
    illumination_required: 'Illumination Required',
    auto_level_tank: 'Auto Level Control in Tank',
    extra_cups_sets: 'Extra Set of Cups Required'
  };

  private _quotation_item_types: { [key: string]: string } = {
    speed: 'number',
    no_of_washes: 'number',
    industry: 'string',
    gmp_requirement: 'boolean',
    bottle_moc: 'string',
    water_saving: 'boolean',
    filters_required: 'boolean',
    illumination_required: 'boolean',
    auto_level_tank: 'boolean',
    extra_cups_sets: 'number'
  };

  constructor() {}

  get quotation_item_names(): { [key: string]: string } {
    return Object.assign(this._quotation_item_names, {});
  }

  get quotation_item_types(): { [key: string]: string } {
    return Object.assign(this._quotation_item_types, {});
  }
}
