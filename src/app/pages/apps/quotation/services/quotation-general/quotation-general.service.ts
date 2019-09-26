import { Injectable } from '@angular/core';
import { QuotationData } from 'src/app/interfaces/quotation-data';

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

  private _empty_quotation: QuotationData = {
    _id: null,
    quotation_num: null,
    speed: {
      qty: null,
      price: null
    },
    no_of_washes: {
      qty: null,
      price: null
    },
    industry: {
      qty: null,
      price: null
    },
    gmp_requirement: {
      qty: null,
      price: null
    },
    bottle_moc: {
      qty: null,
      price: null
    },
    water_saving: {
      qty: null,
      price: null
    },
    filters_required: {
      qty: null,
      price: null
    },
    illumination_required: {
      qty: null,
      price: null
    },
    auto_level_tank: {
      qty: null,
      price: null
    },
    extra_cups_sets: {
      qty: null,
      price: null
    },
    other_details: null,
    customer_details: {
      name: null,
      address: null,
      person_of_contact: {
        title: null,
        name: null
      },
      contact_no: null
    },
    created_by: null,
    created_date: null,
    is_active: null,
    extra_data: {}
  };

  constructor() {}

  get quotation_item_names(): { [key: string]: string } {
    return Object.assign(this._quotation_item_names, {});
  }

  get quotation_item_types(): { [key: string]: string } {
    return Object.assign(this._quotation_item_types, {});
  }

  get empty_quotation(): QuotationData {
    return this._empty_quotation;
  }
}
