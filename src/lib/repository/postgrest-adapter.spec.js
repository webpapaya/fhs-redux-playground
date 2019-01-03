import { assertThat, hasProperties, equalTo } from 'hamjest';
import { eq, oneOf, gt, gte, lt, lte, not, like } from './operators';
import { toQueryParams } from './postgrest-adapter';

[
  { filter: {}, result: '' },
  { filter: { prop: eq(1)}, result: 'prop=eq.1' },
  { filter: { prop: eq(null)}, result: 'prop=is.null' },
  { filter: { prop: eq(null)}, result: 'prop=is.null' },
  { filter: { prop: oneOf(1, 2, 3)}, result: 'prop=in.(1,2,3)' },
  { filter: { prop: oneOf('Sepp', 'Huber')}, result: 'prop=in.("Sepp","Huber")' },
  { filter: { prop: gt(1)}, result: 'prop=gt.1' },
  { filter: { prop: gte(1)}, result: 'prop=gte.1' },
  { filter: { prop: like('%first%last')}, result: 'prop=like.*first*last' },

  { filter: { prop: lt(1)}, result: 'prop=lt.1' },
  { filter: { prop: lte(1)}, result: 'prop=lte.1' },
  { filter: { prop: not(eq(1))}, result: 'prop=not.eq.1'},
  { filter: { prop1: eq(1), prop2: eq(2) }, result: 'prop1=eq.1&prop2=eq.2' },

  { filter: { prop: { operator: 'unknown', value: 1 } }, result: '' },
].forEach(({ filter, result }) => {
  it(`${JSON.stringify(filter)} results in ${result}`, () => {
    assertThat(toQueryParams(filter), equalTo(result));
  });
});
