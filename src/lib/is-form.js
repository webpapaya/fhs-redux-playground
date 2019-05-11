import React from 'react';
import PropTypes from 'prop-types';
import { uniq, omit } from 'ramda';
import { ignoreReturnFor, rethrowError } from 'promise-frites';
import { setValue, removeValue } from './is-form.utils';

class Form extends React.Component {
		static propTypes = {
			onSubmit: PropTypes.func.isRequired,
			defaultValues: PropTypes.any, // eslint-disable-line react/forbid-prop-types, react/no-unused-prop-types
		}

		static defaultProps = {
			defaultValues: {},
		}

		state = {
			touched: [],
			values: {},
			errors: {},
			isSubmitting: false,
			wasSubmitted: false,
		};

		static getDerivedStateFromProps(props, state) {
			const values = { ...state.values, ...omit(state.touched, props.defaultValues) };
			return { ...state, values };
		}

		safeSetState = (...args) => new Promise(resolve => this.setState(...args, resolve));

		onSubmit = (evt) => {
			evt.preventDefault();
			if (!this.props.onSubmit) { return Promise.resolve(); }

			return Promise.resolve()
				.then(ignoreReturnFor(() => this.safeSetState({ isSubmitting: true })))
				.then(() => this.props.onSubmit(this.state.values))
				.then(ignoreReturnFor(() => this.safeSetState({ isSubmitting: false, wasSubmitted: true })))
				.catch(rethrowError(() => this.safeSetState({ isSubmitting: false, wasSubmitted: false })));
		}

		setFormValue = (name, value) => {
			this.setState((state) => {
				const touched = name in state.values
					? uniq([...state.touched, name])
					: state.touched;

				return ({
					values: setValue(name, value, state.values),
					touched,
				});
			});
		};

		removeFormField = (name) => {
			this.setState((state => ({ values: removeValue(name, state.values) })));
		}

		render() {
			const form = {
				...this.state,
				setFormValue: this.setFormValue,
				addFormField: this.setFormValue,
				removeFormField: this.removeFormField,
				onSubmit: this.onSubmit,
			};

			return <this.props.Component {...this.props} form={form} />;
		}
}
const isForm = Component => props => <Form {...props} Component={Component} />;

export default isForm;
