import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
	q, limit, offset, filterByQuery, where, oneOf,
} from 'datenkrake';

const clampNumber = (min, max, number) => Math.min(Math.max(number, min), max);

const PaginationWrapper = withRouter(class extends React.Component {
	static propTypes = {
		history: PropTypes.shape({
			listen: PropTypes.func,
		}).isRequired,
		parentProps: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
		config: PropTypes.shape({
			uniqueKey: PropTypes.string,
			itemsLoadingFnName: PropTypes.string,
			pageSize: PropTypes.number,
			itemsPropName: PropTypes.string,
		}).isRequired,
	}

	state = {
		itemQuery: q(),
		currentPage: 0,
		totalItems: 0,
	}

	componentDidMount() {
		this.historyUnlisten = this.props.history.listen(() => this.reload());
		this.reload();
	}

	componentDidUpdate(prevProps) {
		const currItemsLength = this.getItemsFromProps(this.props.parentProps).length;
		const prevItemsLength = this.getItemsFromProps(prevProps.parentProps).length;

		this.onPageChange(clampNumber(0, this.pageCount - 1, this.state.currentPage));
		if (currItemsLength !== prevItemsLength) {
			this.reload();
		}
	}

	componentWillUnmount() {
		this.historyUnlisten();
	}

	get config() {
		return {
			uniqueKey: 'id',
			itemsLoadingFnName: 'onItemsLoad',
			itemsPropName: 'items',
			pageSize: 25,
			...this.props.config,
		};
	}

	get pageCount() {
		return Math.ceil(this.state.totalItems / this.config.pageSize);
	}

	get items() {
		// This prevents a flickering screen when an item gets removed from the list
		// and the next item in the list is already cached on the client
		const allItems = this.getItemsFromProps(this.props.parentProps);
		const selectedItems = filterByQuery(this.state.itemQuery, allItems);
		const indexIfFirst = allItems.indexOf(selectedItems[0]);
		const otherItems = allItems.filter((item, index) => indexIfFirst < index && !selectedItems.includes(item));

		return [...selectedItems, ...otherItems].slice(0, this.config.pageSize);
	}

	getItemsFromProps(props) {
		return props[this.config.itemsPropName] || [];
	}

	onPageChange = (currentPage) => {
		if (currentPage < 0 || this.state.currentPage === currentPage) { return; }
		this.setState(state => ({ ...state, currentPage }), () => this.reload());
	}

	reload() {
		const query = q(
			limit(this.config.pageSize),
			offset(this.state.currentPage * this.config.pageSize),
		);

		return Promise.resolve()
			.then(() => this.props.parentProps[this.config.itemsLoadingFnName](query))
			.then(({ payload, meta }) => new Promise((resolve) => {
				const totalItems = meta.contentRange.total;
				const pageCount = Math.floor(totalItems / this.config.pageSize);
				const currentPage = clampNumber(0, pageCount, this.state.currentPage);

				const recordIds = payload.map(record => record[this.config.uniqueKey]);
				this.setState(() => ({
					itemQuery: q(where({ [this.config.uniqueKey]: oneOf(...recordIds) })),
					totalItems,
					currentPage,
				}), resolve);
			})).catch(() =>
				// This a hack for the case that the contant-range
				// can't be setisfied by postgrest. This should be
				// handled on the repository itself.
				this.onPageChange(0));
	}


	render() {
		const childProps = { ...this.props.parentProps, [this.config.itemsPropName]: this.items };

		return (
			<this.props.Component
				{...childProps}
				pageCount={this.pageCount}
				currentPage={this.state.currentPage}
				onPageChange={this.onPageChange}
			/>
		);
	}
});

const isPaginated = (config, Component) => props => (
	<PaginationWrapper
		config={config}
		Component={Component}
		parentProps={props}
	/>
);

export default isPaginated;
