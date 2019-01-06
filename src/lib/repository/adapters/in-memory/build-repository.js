import { filterByQuery } from '../../selectors';

const buildRepository = ({ resource }) => {
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

  const update = (connection, query, values) => {
    const recordsToUpdate = where(connection, query);
    const recordsToReturn = [];

    // There is room for performance improvements here =)
    connection[resource] = connection[resource].map((record) => {
      if (!recordsToUpdate.includes(record)) { return record; }
      const updatedRecord = { ...record, ...values };
      recordsToReturn.push(updatedRecord);
      return updatedRecord;
    });

    return recordsToReturn;
  }

  const count = (connection, query) => {
    return where(connection, query).length;
  }

  return {
    count,
    where,
    create,
    destroy,
    update,
  };
}

export default buildRepository;