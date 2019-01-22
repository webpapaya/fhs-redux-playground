import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Organism from './organism';
import pipe from '../../lib/pipe';
import { q, where, gte, order, desc, asc } from 'datenkrake';
import { toQueryParams } from 'datenkrake/src/adapters/postgrest';

const parseOrder = (string) => {
	const [property, direction] = string.split('.');
	return direction === 'desc'
		? desc(property)
		: asc(property)
}

const mapDispatchToProps = (_, props) => ({
	onSubmit: params => {
		const amount = !params.amount ? undefined : where({ amount: gte(params.amount) });
		const sorting = !params.order ? undefined : order(parseOrder(params.order));
	
		return props.history.replace({ search: `?${toQueryParams(q(amount,sorting))}` });
	},
});

export default pipe(
	withRouter,
	connect(null, mapDispatchToProps),
)(Organism);
