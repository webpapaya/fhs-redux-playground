import React from 'react';
import PropTypes from 'prop-types';
import { ignoreReturnFor } from 'promise-frites';

const omit = (attributes, obj) => Object.keys(obj).reduce((acc, key) => {
	if (!attributes.includes(key)) { acc[key] = obj[key]; }
	return acc;
}, {});

const buildInputHTMLElement = ({
	excludeProps, getValue, getWrapperProp, ...wrapperProps
}) => props => (
	<input
		{...(omit(excludeProps, props))}
		{...wrapperProps}
		{...getValue()}
		{...(getWrapperProp('name') ? { name: getWrapperProp('name') } : {})}
	/>
);

const buildSelectHTMLElement = ({
	excludeProps, getValue, getWrapperProp, ...wrapperProps
}) => props => (
	<select
		{...(omit(excludeProps, props))}
		{...wrapperProps}
		{...getValue()}
		{...(getWrapperProp('name') ? { name: getWrapperProp('name') } : {})}
	/>
);

const buildOptionHTMLElement = ({ excludeProps }) => props => (
	<option
		{...(omit(excludeProps, props))}
	/>
);

const buildLabelHTMLElement = ({ excludeProps, getWrapperProp }) => props => (
	<label // eslint-disable-line
		{...(omit(excludeProps, props))}
		{...(getWrapperProp('name') ? { htmlFor: getWrapperProp('name') } : {})}
	/>
);

const HTMLElements = {
	Input: buildInputHTMLElement,
	Label: buildLabelHTMLElement,
	Select: buildSelectHTMLElement,
	Option: buildOptionHTMLElement,
};

const defaultReducer = v => v;
const buildInput = ({ reducer = defaultReducer }, InputComponent) => class InputState extends React.Component {
		static propTypes = {
			parentProps: PropTypes.any, // eslint-disable-line react/forbid-prop-types
			values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
			value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
			initialValue: PropTypes.oneOfType([String, Number]),
			name: PropTypes.string.isRequired,
			disabled: PropTypes.bool,
		}

		static defaultProps = {
			disabled: false,
			value: undefined,
			initialValue: undefined,
		}

		state = {
			focused: false,
			touched: false,
		};

		componentDidMount() {
			this.safeCallProp('setFormValue', this.props.name, this.props.initialValue);
		}

		componentWillUnmount() {
			this.safeCallProp('removeFormValue', this.props.name);
		}


		get domElements() {
			if (!this._domElements) { this.createDomElements(); }
			return this._domElements;
		}

		promiseSetState(stateFn) {
			return new Promise(resolve => {
				if (this.isUnmounted) { return; }
				this.setState(stateFn, resolve)
			});
		}

		handleEvent = (evt, eventName, stateFn) => {
			if (this.props.disabled) { return Promise.resolve(); }
			return this.promiseSetState(stateFn)
				.then(ignoreReturnFor(() => this.props[eventName] && this.props[eventName](evt)));
		}


		handleChange = (evt) => {
			if (this.props.disabled) { return; }

			evt.persist(); // TODO: remove
			evt.target.value = reducer(evt.target.value); // eslint-disable-line no-param-reassign
			this.safeCallProp('setFormValue', this.props.name, evt.target.value);
			this.handleEvent(evt, 'onChange', state => ({ ...state, touched: true }));
		}


		getWrapperProp = name => this.props[name];

		getValue = () => {
			if (('values' in this.props && 'name' in this.props)) { return { value: this.props.values[this.props.name] }; }
			if (('value' in this.props)) { return { value: this.props.value }; }
			return {};
		}

		onFocus = evt => this.handleEvent(evt, 'onFocus', state => ({ ...state, focused: true }));

		onBlur = evt => this.handleEvent(evt, 'onBlur', state => ({ ...state, focused: false }));

		safeCallProp(name, ...args) {
			if (this.props[name]) {
				this.props[name](...args);
			}
		}

		createDomElements() {
			const args = {
				excludeProps: [
					...Object.keys(this.state),
					...Object.keys(HTMLElements),
					'initialValue',
					'getWrapperProp',
					'getValue',
					'reducer',
					'validator',
					'isSubmitting',
					'wasSubmitted',
					'removeFormField',
					'addFormField',
					'setFormValue',
				],
				getWrapperProp: this.getWrapperProp,
				getValue: this.getValue,

				onFocus: this.onFocus,
				onBlur: this.onBlur,
				onChange: this.handleChange,
			};

			this._domElements = Object.keys(HTMLElements).reduce((acc, key) => {
				acc[key] = HTMLElements[key](args);
				return acc;
			}, {});
		}

		render() {
			return (
				<InputComponent
					{...this.props}
					{...this.state}
					{...this.domElements}
				/>
			);
		}
};

export default buildInput;
