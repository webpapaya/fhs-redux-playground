import React from 'react';
import PropTypes from 'prop-types';
import {
	q, limit, offset, filterByQuery, where, oneOf,
} from './repository';


const clampNumber = (min, max, number) => Math.min(Math.max(number, min), max);

class PaginationWrapper extends React.Component {
	propTypes = {
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
				const recordIds = payload.map(record => record[this.config.uniqueKey]);
				this.setState(() => ({
					itemQuery: q(where({ [this.config.uniqueKey]: oneOf(...recordIds) })),
					totalItems: meta.contentRange.total,
				}), resolve);
			}));
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
}

const isPaginated = (config, Component) => props => (
	<PaginationWrapper
		config={config}
		Component={Component}
		parentProps={props}
	/>
);

export default isPaginated;
