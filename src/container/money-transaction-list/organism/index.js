import React from 'react';
import Button from '../../../components/button';
import styles from './index.css';

import { eq } from '../../../lib/repository/operators';
import { q, limit, offset, where } from '../../../lib/repository/query-builder';
import { findByQuery, filterByQuery } from '../../../lib/repository/adapters/in-memory';

class PaginationWrapper extends React.Component {
    state = {
        currentPage: 0,
        totalItems: 0,
    }

    get config() {
        return {
            ...this.props.config,
            pageSize: 25
        }
    }

    get query () {
        return q(
            limit(this.config.pageSize),
            offset(this.state.currentPage * this.config.pageSize),
        );
    }

    reload() {
        Promise.resolve()
            .then(() => this.props.otherProps.onItemsLoad(this.query))
            .then(({ meta }) => this.setState(() => {
                return { totalItems: meta.contentRange.total };
            }));
    }

    componentDidMount() {
        this.reload()
    }

    componentDidUpdate(prevProps) {
        const currItemsLength = this.props.items.length;
        const prevItemsLength = prevProps.items.length;

        if (currItemsLength !== prevItemsLength) {
            this.reload();
        }
    }

    onPageChange = (currentPage) => {
        this.setState((state) => ({ ...state, currentPage }), () => this.reload());
    }

    render() {
       return (
            <this.props.Component 
                { ...this.props.otherProps }
                pageCount={ Math.ceil(this.state.totalItems / this.config.pageSize) }
                currentPage={ this.state.currentPage } 
                onPageChange={ this.onPageChange }
                items={ filterByQuery(this.query, this.props.items) } 
            />
       ); 
    }
}

const isPaginated = (config, Component) => ({ items, fetchData, ...props }) => (
    <PaginationWrapper 
        config={ config } 
        Component={Component} 
        items={ items } 
        otherProps={ props } 
    />
);

export default isPaginated({}, ({ 
    items: moneyTransactions, 
    users, 
    onDestroy,
    onPageChange,
    pageCount, 
}) => (
    <React.Fragment>
        <ul className={styles.wrapper}>
            { moneyTransactions.map(({ id, creditorId, debitorId, amount }) => (
                <li key={id} className={styles.row}>
                    <span>
                        { findByQuery(where(q({ id: eq(debitorId) })), users).name }
                        { findByQuery(where(q({ id: eq(creditorId) })), users).name } 
                        { amount }    
                    </span>
                    
                    <Button color="danger" onClick={() => onDestroy(q(where({ id: eq(id) }))) }>
                        Delete
                    </Button>
                </li>
            )) }
        </ul>
        
        { Array.from({ length: pageCount }).map((_, index) => (
            <span onClick={ () => onPageChange(index) } key={index}>
                { index + 1 }
            </span>
        )) }
    </React.Fragment>
    
));