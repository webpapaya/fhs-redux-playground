import React from 'react';
import { q, limit, offset, filterByQuery, where, oneOf } from './repository';

const clampNumber = (min, max, number) => 
    Math.min(Math.max(number, min), max);

class PaginationWrapper extends React.Component {
    state = {
        itemQuery: q(),
        currentPage: 0,
        totalItems: 0,
    }

    get config() {
        return {
            uniqueKey: 'id',
            itemsLoadingFnName: 'onItemsLoad',
            itemsPropName: 'items',
            pageSize: 25,
            ...this.props.config,
        }
    }

    get pageCount() {
        return Math.ceil(this.state.totalItems / this.config.pageSize);
    }
    
    getItemsFromProps(props) {
        return props[this.config.itemsPropName] || [];
    }

    reload() {
        const query = q(
            limit(this.config.pageSize),
            offset(this.state.currentPage * this.config.pageSize),
        );

        Promise.resolve()
            .then(() => this.props.parentProps[this.config.itemsLoadingFnName](query))
            .then(({ payload, meta }) => new Promise((resolve) => {
                const recordIds = payload.map((record) => record[this.config.uniqueKey]);
                console.log(recordIds);
                this.setState(() => ({ 
                    itemQuery: q(where({ [this.config.uniqueKey]: oneOf(...recordIds) })),
                    totalItems: meta.contentRange.total 
                }), resolve);
            }));
    }

    componentDidMount() {
        this.reload()
    }

    componentDidUpdate(prevProps) {
        const currItemsLength = this.getItemsFromProps(this.props.parentProps).length;
        const prevItemsLength = this.getItemsFromProps(prevProps.parentProps).length;

        this.onPageChange(clampNumber(0, this.pageCount - 1, this.state.currentPage));
        if (currItemsLength !== prevItemsLength) {
            return this.reload();
        }
    }

    onPageChange = (currentPage) => {
        if (currentPage < 0 || this.state.currentPage === currentPage) { return; }
        this.setState((state) => ({ ...state, currentPage }), () => this.reload());
    }

    get items() {
        const allItems = this.getItemsFromProps(this.props.parentProps);
        const selectedItems = filterByQuery(this.state.itemQuery, allItems);
        const otherItems = allItems.filter((item) => {
            return !selectedItems.includes(item)
        });

        // This prevents a flickering screen when an item gets removed from the list
        return [...selectedItems, ...otherItems].slice(0, this.config.pageSize);
    }

    render() {
        const childProps = { ...this.props.parentProps, [this.config.itemsPropName]: this.items };

        return (
            <this.props.Component 
                { ...childProps }
                pageCount={ this.pageCount }
                currentPage={ this.state.currentPage } 
                onPageChange={ this.onPageChange }
            />
       ); 
    }
}

const isPaginated = (config, Component) => (props) => (
    <PaginationWrapper 
        config={ config } 
        Component={Component} 
        parentProps={ props } 
    />
);

export default isPaginated;