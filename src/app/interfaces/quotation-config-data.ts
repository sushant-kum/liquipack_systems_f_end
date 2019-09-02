export interface QuotationConfigData {
  _id: string;
  config_name: string;
  speed: {
    options: {
      qty: number;
      price: number;
    }[],
    default_option_index: number
  };
  no_of_washes: {
    options: {
      qty: number;
      price: number;
    }[],
    default_option_index: number
  };
  industry: {
    options: {
      qty: string;
      price: number;
    }[],
    default_option_index: number;
  };
  gmp_requirement: {
    options: {
      qty: boolean;
      price: number;
    }[],
    default_option_index: number
  };
  bottle_moc: {
    options: {
      qty: string;
      price: number;
    }[],
    default_option_index: number
  };
  water_saving: {
    options: {
      qty: boolean;
      price: number;
    }[],
    default_option_index: number
  };
  filters_required: {
    options: {
      qty: boolean;
      price: number;
    }[],
    default_option_index: number
  };
  illumination_required: {
    options: {
      qty: boolean;
      price: number;
    }[],
    default_option_index: number
  };
  auto_level_tank: {
    options: {
      qty: boolean;
      price: number;
    }[],
    default_option_index: number
  };
  extra_cups_sets: {
    options: {
      qty: number;
      price: number;
    }[],
    default_option_index: number
  };
  created_by: string;
  created_date: Date;
  is_active: boolean;
  extra_data?: any;
}
