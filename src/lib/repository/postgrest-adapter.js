import * as operators from './operators';

const isString = (value) => 
  Object.prototype.toString.call(value) === "[object String]";

const OPERATOR_LIST = {
  gt: (value) => `gt.${value}`,
  gte: (value) => `gte.${value}`,
  lt: (value) => `lt.${value}`,
  lte: (value) => `lte.${value}`,
  not: (value) => `not.${toValue(value)}`,
  like: (value) => `like.${value.replace(/%/g, '*')}`,
  oneOf: (values) => {
    const parsedValues = values
      .map((value) => isString(value) ? `"${value}"` : value)
      .join(',');

    return `in.(${parsedValues})`;
  },
  eq: (value) => value === null
    ? `is.null`
    : `eq.${value}`,
};

const defaultOperator = () => '';
const toValue = (property) =>
  (OPERATOR_LIST[property.operator] || defaultOperator)(property.value);

export const toQueryParams = (filter) => Object.keys(filter)
  .filter((key) => filter[key].operator in OPERATOR_LIST)
  .map((key) => `${key}=${toValue(filter[key])}`) 
  .join('&');


