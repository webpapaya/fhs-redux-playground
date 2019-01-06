import { 
  equals as rEquals, 
  where as rWhere, 
  filter as rFilter,
  lt as rGt, // ramda is weired and swaps gt and lt
  lte as rGte,
  gt as rLt,
  gte as rLte,
  includes as rIncludes,
  complement as rNot,
  descend as rDescendent,
  ascend as rAscendent,
  sortWith as rSortWith,
  slice as rSlice,

  flip,
  is,
  isNil,
} from 'ramda';

const FILTERS = {
  eq: rEquals,
  gt: rGt,
  gte: rGte,
  lt: rLt,
  lte: rLte,
  oneOf: flip(rIncludes),
  like: (likeQuery) => (value) => {
    const query = likeQuery.replace(/%/g, '.*');
    return is(String, value) && value.match(new RegExp(query));
  }
}

const buildSortDirection = (definition) => {
  const fetchValueToSort = (obj) => {
    const value = obj[definition.value];
    if (!isNil(value)) { return value; }
    else if (definition.operator === 'asc') { 
      return definition.options.nulls === 'first' ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY; 
    } else  {
      return definition.options.nulls === 'first' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY; 
    }
  }
  return definition.operator === 'asc'
    ? rAscendent(fetchValueToSort)
    : rDescendent(fetchValueToSort);
} 

const definitionToRamda = (definition) => {
  if (definition.operator === 'not') {
    return rNot(definitionToRamda(definition.value))
  } else {
    return FILTERS[definition.operator](definition.value);
  }
}

const filterRecords = ({ where = {} } = {}, records) => {
  const filter = Object.keys(where).reduce((acc, propertyName) => {
    acc[propertyName] = definitionToRamda(where[propertyName]);
    return acc;
  }, {});

  return rFilter(rWhere(filter), records);
}

const orderRecords = ({ order = [] } = {}, records) => {
  if (order.length === 0) { return records; }
  const sortDefinition = order.map((definition) => buildSortDirection(definition));
  return rSortWith(sortDefinition, records);
}

const paginateRecords = ({ limit, offset } = {}, records) => {
  if (isNil(limit) && isNil(offset)) { return records; }
  return rSlice(offset, offset + limit, records);
}

export const filterByQuery = (query, collection) => {
  const filteredRecords = filterRecords(query, collection);
  const sortedRecords = orderRecords(query, filteredRecords);
  return paginateRecords(query, sortedRecords);
}

export const findByQuery = (query, collection, defaultValue = {}) => {
  const filteredRecords = filterByQuery(query, collection);
  return filteredRecords[0] || defaultValue;
}

export const buildRepository = ({ resource }) => {
  const where = (connection, query) => {
    const records = connection[resource];
    return filterByQuery(query, records);
  }

  const destroy = (connection, query) => {
    const destroyedRecords = where(connection, query);
    
    // There is room for performance improvements here =)
    connection[resource] = connection[resource].filter((record) => {
      return !destroyedRecords.includes(record);
    });
    
    return destroyedRecords;
  }

  const create = (connection, record) => {
    connection[resource] = [...connection[resource], record];
    return  record;
  }

  const count = (connection, query) => {
    return where(connection, query).length;
  }

  return {
    count,
    where,
    create,
    destroy
  };
}

