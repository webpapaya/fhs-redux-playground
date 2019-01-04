import React from 'react';
import { q, limit, offset } from './repository/query-builder';
import { filterByQuery } from './repository/adapters/in-memory';

const clampNumber = (min, max, number) => 
    Math.min(Math.max(number, min), max);

class PaginationWrapper extends React.Component {
    state = {
        currentPage: 0,
        totalItems: 0,
    }

    get config() {
        return {
            itemsPropName: 'items',
            pageSize: 25,
            ...this.props.config,
        }
    }

    get query() {
        return q(
            limit(this.config.pageSize),
            offset(this.state.currentPage * this.config.pageSize),
        );
    }

    get pageCount() {
        return Math.ceil(this.state.totalItems / this.config.pageSize);
    }
    
    getItemsFromProps(props) {
        return props[this.config.itemsPropName] || [];
    }

    reload() {
        Promise.resolve()
            .then(() => this.props.parentProps.onItemsLoad(this.query))
            .then(({ meta }) => this.setState(() => ({ totalItems: meta.contentRange.total })));
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

    render() {
        const items = filterByQuery(this.query, this.getItemsFromProps(this.props.parentProps));
        const childProps = { ...this.props.parentProps, [this.config.itemsPropName]: items };

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