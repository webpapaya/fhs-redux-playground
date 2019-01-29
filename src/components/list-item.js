import React from 'react';
import PropTypes from 'prop-types';
import className from '../lib/class-name';
import styles from './list-item.css';

class ListItem extends React.Component {
	static propTypes = {
		header: PropTypes.node.isRequired,
		body: PropTypes.node,
	};

	static defaultProps = {
		body: undefined,
	};

	state = { isOpen: false };

	toggleOpen = () => this.setState(state => ({ isOpen: this.props.body && !state.isOpen }));

	render() {
		return (
			<li
				onClick={this.toggleOpen}
				className={className(
					styles.row,
					this.state.isOpen && styles.open,
					this.props.body && styles.clickable,
				)}
			>
				<div className={styles.header}>
					{ this.props.header }
				</div>

				{ this.state.isOpen && (
					<div className={styles.body}>{ this.props.body }</div>
				) }
			</li>
		);
	}
}

export default ListItem;
