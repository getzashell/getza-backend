export type PlaceholderValueType =
  | 'string'
  | 'text'
  | 'email'
  | 'phone'
  | 'date'
  | 'money'
  | 'number'
  | 'boolean'
  | 'enum'
  | 'address'
  | 'list_string'
  | 'list_object'
  | 'object';

export type PlaceholderLegendItem = {
  path: string;
  label: string;
  type: PlaceholderValueType;
  required?: boolean;
  example?: any;
  description?: string;
  rules?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
    options?: string[];
  };
  conditional?: {
    dependsOn: string;
    equals?: any;
    anyOf?: any[];
    truthy?: boolean;
  };
};

export type PlaceholderLegend = {
  version: 1;
  items: PlaceholderLegendItem[];
};
