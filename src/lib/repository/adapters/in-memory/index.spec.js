import { assertThat, equalTo, not as negate, hasItem, hasItems, contains } from 'hamjest';
import { q, where, order } from '../../query-builder';
import { eq, gt, gte, lt, lte, oneOf, like, not, asc, desc, and } from '../../operators';
import { buildRepository } from './index';

describe('where', () => {
  const records = [
    { text: 'abc', property: 1 },
    { text: 'def', property: 2 },
    { text: 'ghi', property: null },
  ];

  const connection = { user: records };
  const repository = buildRepository({ resource: 'user' });

  describe('filters', () => {
    it('returns all records without a filter', () => {
      assertThat(repository.where(connection), equalTo(records));
    });
  
    it('works with eq filter', () => {
      assertThat(repository.where(connection, q(where({ property: eq(1) }))), 
        equalTo([records[0]]));
    });
  
    it('works with not filter', () => {
      assertThat(repository.where(connection, q(where({ property: not(eq(1)) }))), 
        negate(hasItem(records[0])));
    })
  
    it('works with gt filter', () => {
      assertThat(repository.where(connection, q(where({ property: gt(1) }))), 
        negate(hasItem(records[0])));
    });
  
    it('works with gte filter', () => {
      assertThat(repository.where(connection, q(where({ property: gte(2) }))), 
        negate(hasItem(records[0])));
    });
  
    it('works with lt filter', () => {
      assertThat(repository.where(connection, q(where({ property: lt(2) }))), 
        hasItem(records[0]));
    });
  
    it('works with lte filter', () => {
      assertThat(repository.where(connection, q(where({ property: lte(1) }))), 
        hasItem(records[0]));
    });
  
    it('works with oneOf filter', () => {
      assertThat(repository.where(connection, q(where({ property: oneOf(1, 2) }))), 
        hasItems(records[0], records[1]));
    });
  
    it('works with like filter', () => {
      assertThat(repository.where(connection, q(where({ text: like('%b%') }))), 
        hasItems(records[0]));
    });
  });

  describe('order', () => {
    describe('asc', () => {
      it('nulls are last by default', () => {
        assertThat(repository.where(connection, q(order(asc('property')))),
          contains(records[0], records[1], records[2]));
      });
  
      it('with nulls first option', () => {
        assertThat(repository.where(connection, q(order(asc('property', { nulls: 'first' })))),
          contains(records[2], records[0], records[1]));
      });
  
      it('with nulls nulls last option', () => {
        assertThat(repository.where(connection, q(order(asc('property', { nulls: 'last' })))),
          contains(records[0], records[1], records[2]));
      });
    });
    
    describe('desc', () => {
      it('nulls are first by default', () => {
        assertThat(repository.where(connection, q(order(desc('property')))),
          contains(records[1], records[0], records[2]));
      });

      it('with nulls first option', () => {
        assertThat(repository.where(connection, q(order(desc('property', { nulls: 'first' })))),
          contains(records[2], records[1], records[0]));
      });
  
      it('with nulls nulls last option', () => {
        assertThat(repository.where(connection, q(order(desc('property', { nulls: 'last' })))),
          contains(records[1], records[0], records[2]));
      });
    });

  });
});

describe('destroy', () => {
  const records = [
    { text: 'abc', property: 1 },
    { text: 'def', property: 2 },
    { text: 'ghi', property: null },
  ];

  const repository = buildRepository({ resource: 'user' });

  it('removes record from connection', () => {
    const connection = { user: records };
    repository.destroy(connection, q(where({ property: eq(1) })));
    assertThat(connection.user, negate(hasItem(records[0])));
  });

  it('returns removed record', () => {
    const connection = { user: records };
    const removedRecords = repository.destroy(connection, q(where({ property: eq(1) })));
    assertThat(removedRecords, hasItem(records[0]));
  });
});