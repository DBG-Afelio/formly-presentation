import { invert } from 'lodash';
export enum PrefixPhonesEnum {
  'BE' = '+32',
  'FR' = '+33',
  'LU' = '+352',
  'NL' = '+31',
  'ES' = '+34',
  'IT' = '+39'
}

export const InvertedPrefixPhones = invert(PrefixPhonesEnum);
