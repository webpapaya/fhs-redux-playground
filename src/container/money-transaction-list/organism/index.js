import React from 'react';
import Button from '../../../components/button';
import styles from './index.css';

class PaginationWrapper extends React.Component {
    state = {
        offset: 0,
        total: null,
        from: null,
        to: null,
        itemOrder: [],
    }

    get config() {
        return {
            ...this.props.config,
            pageSize: 25,
            recordProperty: 'id'
        }
    }

    reload() {
        Promise.resolve()
            .then(() => this.props.otherProps.onItemsLoad(this.props.otherProps))
            .then(({ meta, payload }) => this.setState((state) => {
                const itemOrder = payload.map((record) => record[this.config.recordProperty]);
                return { ...state, ...meta.contentRange, itemOrder };
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

    sliceItems(items) {
        return this.state.itemOrder.reduce((result, value) => {
            const item = items.find((item) => item[this.config.recordProperty] === value);
            if (item) { result.push(item); }
            return result;
        }, []);
    }

    render() {
       return (
            <this.props.Component 
                { ...this.props.otherProps } 
                items={this.sliceItems(this.props.items)} 
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

export default isPaginated({}, ({ items: moneyTransactions, users, onDestroy }) => (
    <ul className={styles.wrapper}>
        { moneyTransactions.map(({ id, creditorId, debitorId, amount }) => (
            <li key={id} className={styles.row}>
                <span>
                    { (users.find((user) => user.id === creditorId ) || {}).name } - 
                    { (users.find((user) => user.id === debitorId ) || {}).name } - 
                    { amount }    
                </span>
                
                <Button color="danger" onClick={() => onDestroy({ id })}>
                    Delete
                </Button>
            </li>
        )) }
    </ul>
));