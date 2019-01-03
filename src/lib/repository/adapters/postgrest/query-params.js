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

const toQueryParam = (key, value) => !(value === void 0 || value === null || value === '')
  ? `${key}=${value}`
  : '';

export const buildQueryParamsForOrder = (order = []) => {
  const items = order
    .map(({ operator, value, options }) => {
      const param = `${value}.${operator}`;
      if (options.nulls === 'first') { return `${param}.nullsfirst`; }
      if (options.nulls === 'last') { return `${param}.nullslast`; } 
      return param;
    })
    .join(',');
  
  return toQueryParam('order', items);
};

export const buildQueryParamsForWhere = (where = {}) => Object.keys(where)
  .filter((key) => where[key].operator in OPERATOR_LIST)
  .map((key) => `${key}=${toValue(where[key])}`) 
  .join('&');

export const buildQueryParamsForLimit = (limit) => 
  toQueryParam('limit', limit);  

export const buildQueryParamsForOffset = (offset) => 
  toQueryParam('offset', offset);

export default (query) => {
  const { where, order, limit, offset } = query || {};
  const queryParams = [
    buildQueryParamsForWhere(where),
    buildQueryParamsForOrder(order),
    buildQueryParamsForLimit(limit),
    buildQueryParamsForOffset(offset),
  ].filter((queryParam) => queryParam);

  return queryParams.length > 0
    ? `?${queryParams.join('&')}` 
    : '';
}
  

