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
  flip,
  is,
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

const queryToRamda = ({ where }, records) => {
  const filter = Object.keys(where).reduce((acc, propertyName) => {
    acc[propertyName] = definitionToRamda(where[propertyName]);
    return acc;
  }, {});

  return rFilter(rWhere(filter), records);
}


export const buildRepository = ({ resource }) => {
  const where = (connection, query) => {
    const records = connection[resource];
    if (!query) { return records; } 
    return queryToRamda(query, records);
  }

  return {
    where
  };
}

