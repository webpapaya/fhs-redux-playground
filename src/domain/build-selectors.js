import { createFilterByQuery, createFindByQuery } from 'datenkrake/src/selectors';

const buildSelectors = ({ path }) => ({
	filterByQuery: createFilterByQuery({ path }),
	findByQuery: createFindByQuery({ path }),
});

export default buildSelectors;
