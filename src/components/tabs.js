import React from 'react';
import PropTypes from 'prop-types';
import styles from './tabs.css';
import className from '../lib/class-name';

export const Tab = ({ children }) => children;

export class Tabs extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
	}

	state = {
		selectedIndex: 0,
	}

	setTab = (selectedIndex) => {
		this.setState({ selectedIndex });
	}

	render() {
		const items = this.props.children;
		const currentChild = items[this.state.selectedIndex];


		return (
			<section>
				<nav className={styles['nav-wrapper']}>
					{ items.map((item, index) => (
						<button
							type="button"
							className={className(
								styles['nav-item'],
								index === this.state.selectedIndex && styles.selected,
							)}
							onClick={() => this.setTab(index)}
							key={item.props.title}
						>
							{item.props.title}
						</button>
					))}
				</nav>
				<div>
					{ currentChild }
				</div>
			</section>
		);
	}
}
