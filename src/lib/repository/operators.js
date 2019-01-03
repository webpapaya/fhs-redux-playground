const buildFilterOperator = (operator) => (value) => ({ operator, value });

export const eq = buildFilterOperator('eq');
export const gt = buildFilterOperator('gt');
export const gte = buildFilterOperator('gte');
export const lt = buildFilterOperator('lt');
export const lte = buildFilterOperator('lte');
export const not = buildFilterOperator('not');
export const like = buildFilterOperator('like');

export const oneOf = (...value) => ({ operator: 'oneOf', value });

export const asc = buildFilterOperator('asc');
export const desc = buildFilterOperator('desc');
