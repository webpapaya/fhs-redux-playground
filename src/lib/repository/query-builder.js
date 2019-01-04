const appendOperator = (result, definition) => {
  if (definition.operator === 'where') {
    result.where = { ...result.where, ...definition.value };
  } else if (definition.operator === 'order') {
    const nextOrderProps = definition.value.map((v) => v.value);
    const order = result.order.filter((order) => !nextOrderProps.includes(order.value));
    result.order = [ ...order, ...definition.value ];
  } else if (definition.operator === 'limit' && definition.value !== void 0) {
    result.limit = definition.value;
  } else if (definition.operator === 'offset' && definition.value !== void 0) {
    result.offset = definition.value;
  } else if (definition.operator === 'query') {
    Object.keys(definition).forEach((key) => {
      appendOperator(result, { operator: key, value: definition[key] });
    });
  }
  return result;
}

export const q = (...actions) => {
  const defaultQuery = {
    order: [],
    where: {},
    operator: 'query',
    limit: void 0,
    offset: void 0,
  };

  return actions.reduce(appendOperator, defaultQuery);
}

export const where = (value) => ({ operator: 'where', value });
export const order = (...value) => ({ operator: 'order', value });
export const limit = (value) => ({ operator: 'limit', value });
export const offset = (value) => ({ operator: 'offset', value });
