import { Injectable } from "@angular/core";
import { QuotationConfigData } from "src/app/interfaces/quotation-config-data";

@Injectable({
  providedIn: "root"
})
export class QuotationConfigGeneralService {
  private _empty_quotation_config: QuotationConfigData = {
    _id: null,
    config_name: null,
    speed: {
      options: [
        {
          qty: null,
          price: null
        }
      ],
      default_option_index: null
    },
    no_of_washes: {
      options: [
        {
          qty: null,
          price: null
        }
      ],
      default_option_index: null
    },
    industry: {
      options: [
        {
          qty: null,
          price: null
        }
      ],
      default_option_index: null
    },
    gmp_requirement: {
      options: [
        {
          qty: true,
          price: null
        },
        {
          qty: false,
          price: null
        }
      ],
      default_option_index: null
    },
    bottle_moc: {
      options: [
        {
          qty: null,
          price: null
        }
      ],
      default_option_index: null
    },
    water_saving: {
      options: [
        {
          qty: true,
          price: null
        },
        {
          qty: false,
          price: null
        }
      ],
      default_option_index: null
    },
    filters_required: {
      options: [
        {
          qty: true,
          price: null
        },
        {
          qty: false,
          price: null
        }
      ],
      default_option_index: null
    },
    illumination_required: {
      options: [
        {
          qty: true,
          price: null
        },
        {
          qty: false,
          price: null
        }
      ],
      default_option_index: null
    },
    auto_level_tank: {
      options: [
        {
          qty: true,
          price: null
        },
        {
          qty: false,
          price: null
        }
      ],
      default_option_index: null
    },
    extra_cups_sets: {
      options: [
        {
          qty: null,
          price: null
        }
      ],
      default_option_index: null
    },
    created_by: null,
    created_date: null,
    is_active: false
  };

  constructor() {}

  get empty_quotation_config() {
    return Object.assign(this._empty_quotation_config, {});
  }
}
