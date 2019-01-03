import { assertThat, equalTo } from 'hamjest';
import { 
  eq, 
  oneOf, 
  gt, 
  gte, 
  lt, 
  lte, 
  not, 
  like,
  asc,
  desc,
} from '../../operators';

import { q, where, order, limit, offset } from '../../query-builder';
import buildQueryParams, { 
  buildQueryParamsForWhere, 
  buildQueryParamsForOrder,
  buildQueryParamsForLimit,
  buildQueryParamsForOffset,
} from './query-params';

describe('buildQueryParams', () => {
  [
    { query: void 0, result: '' },
    { query: q(order(asc('property'))), result: '?order=property.asc' },
    { query: q(where({ property: eq(1) })), result: '?property=eq.1' },
    { query: q(limit(1)), result: '?limit=1' },
    { query: q(offset(1)), result: '?offset=1' },
    { 
      result: '?property=eq.1&order=property.asc',
      query: q(
        order(asc('property')), 
        where({ property: eq(1) })
      ), 
    },
  ].forEach(({ query, result}) => {
    it(`${query} results in ${result}`, () => {
      assertThat(buildQueryParams(query), equalTo(result));
    });
  });
});

describe('buildQueryParamsForWhere', () => {
  [
    { where: {}, result: '' },
    { where: { prop: eq(1)}, result: 'prop=eq.1' },
    { where: { prop: eq(null)}, result: 'prop=is.null' },
    { where: { prop: eq(null)}, result: 'prop=is.null' },
    { where: { prop: oneOf(1, 2, 3)}, result: 'prop=in.(1,2,3)' },
    { where: { prop: oneOf('Sepp', 'Huber')}, result: 'prop=in.("Sepp","Huber")' },
    { where: { prop: gt(1)}, result: 'prop=gt.1' },
    { where: { prop: gte(1)}, result: 'prop=gte.1' },
    { where: { prop: like('%first%last')}, result: 'prop=like.*first*last' },
  
    { where: { prop: lt(1)}, result: 'prop=lt.1' },
    { where: { prop: lte(1)}, result: 'prop=lte.1' },
    { where: { prop: not(eq(1))}, result: 'prop=not.eq.1'},
    { where: { prop1: eq(1), prop2: eq(2) }, result: 'prop1=eq.1&prop2=eq.2' },
  
    { where: { prop: { operator: 'unknown', value: 1 } }, result: '' },
  ].forEach(({ where, result }) => {
    it(`${JSON.stringify(where)} results in ${result}`, () => {
      assertThat(buildQueryParamsForWhere(where), equalTo(result));
    });
  });  
});

describe('buildQueryParamsForOrder', () => {
  [
    { order: [], result: '' },
    { order: [asc('property')], result: 'order=property.asc' },
    { order: [desc('property')], result: 'order=property.desc' },
    { order: [asc('property1'), desc('property2')], result: 'order=property1.asc,property2.desc' },
    { order: [asc('property', { nulls: 'first' })], result: 'order=property.asc.nullsfirst' },
    { order: [asc('property', { nulls: 'last' })], result: 'order=property.asc.nullslast' },
    { order: [desc('property', { nulls: 'first' })], result: 'order=property.desc.nullsfirst' },
    { order: [desc('property', { nulls: 'last' })], result: 'order=property.desc.nullslast' },
  ].forEach(({ order, result }) => {
    it(`${JSON.stringify(order)} results in ${result}`, () => {
      assertThat(buildQueryParamsForOrder(order), equalTo(result));
    });
  });  
});

describe('buildQueryParamsForLimit', () => {
  [
    { limit: void 0, result: '' },
    { limit: 1, result: 'limit=1' },
  ].forEach(({ limit, result }) => {
    it(`${JSON.stringify(order)} results in ${result}`, () => {
      assertThat(buildQueryParamsForLimit(limit), equalTo(result));
    });
  });  
});

describe('buildQueryParamsForOffset', () => {
  [
    { offset: void 0, result: '' },
    { offset: 1, result: 'offset=1' },
  ].forEach(({ offset, result }) => {
    it(`${JSON.stringify(order)} results in ${result}`, () => {
      assertThat(buildQueryParamsForOffset(offset), equalTo(result));
    });
  });  
});