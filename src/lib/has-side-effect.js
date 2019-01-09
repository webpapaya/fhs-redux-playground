import React from 'react';
import PropTypes from 'prop-types';

class SideEffectLoader extends React.Component {
	static propTypes = {
		config: PropTypes.shape({
			props: PropTypes.arrayOf(String),
			fnName: PropTypes.string,
			wasLoadedName: PropTypes.string,
			isLoadingName: PropTypes.string,
			loadInitially: PropTypes.bool,
		}).isRequired,
		parentProps: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
	}

	state = {
		wasLoaded: false,
		isLoading: false,
	};

	componentDidMount() {
		if (this.config.loadInitially) {
			this.reload();
		}
	}

	componentDidUpdate(prevProps) {
		if (this.shouldReload(prevProps)) {
			this.reload();
		}
	}

	get config() {
		return {
			props: [],
			fnName: 'sideEffect',
			wasLoadedName: 'wasLoaded',
			isLoadingName: 'isLoading',
			loadInitially: true,
			...this.props.config,
		};
	}

	shouldReload = prevProps =>
		!!this.config.props.find(key => this.props.parentProps[key] !== prevProps.parentProps[key]);

	safeSetState = (...args) =>
		new Promise(resolve => this.setState(...args, resolve));

	reload = () => {
		if (!this.props.parentProps.sideEffect) { return Promise.resolve(); }
		return Promise.resolve()
			.then(() => this.safeSetState(() => ({ isLoading: true })))
			.then(() => this.props.parentProps.sideEffect(this.props.parentProps))
			.then(() => this.safeSetState(() => ({ wasLoaded: true, isLoading: false })))
			.catch(() => this.safeSetState(() => ({ isLoading: false })));
	}

	render() {
		const additionalProps = {
			[this.config.wasLoadedName]: this.state.wasLoaded,
			[this.config.isLoadingName]: this.state.isLoading,
		};
		return <this.props.Component {...this.props.parentProps} {...additionalProps} />;
	}
}

export default (config = {}) => Component => parentProps => (
	<SideEffectLoader
		config={config}
		parentProps={parentProps}
		Component={Component}
	/>
);
