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

  const sortDefinition = order.map((definition) => {
    const direction = definition.operator === 'asc'
      ? rAscendent
      : rDescendent;

    const fetchValueToSort = (object) => {
      const valueToSort = object[definition.value];
      if (valueToSort) { return valueToSort; }
      else if (definition.options.nulls === 'first') {
        return Number.NEGATIVE_INFINITY;
      } else {
        return Number.POSITIVE_INFINITY;
      }
    }
    
    return direction(fetchValueToSort);
  });

  return rSortWith(sortDefinition, records);
}

const paginateRecords = ({ limit, offset } = {}, records) => {
  if (isNil(limit) && isNil(offset)) { return records; }
  return slice(offset, limit, records);
}



export const buildRepository = ({ resource }) => {
  const where = (connection, query) => {
    const records = connection[resource];
    const filteredRecords = filterRecords(query, records);
    const sortedRecords = orderRecords(query, filteredRecords);
    return paginateRecords(query, sortedRecords);
  }

  return {
    where
  };
}

