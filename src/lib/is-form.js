import React from 'react';
import PropTypes from 'prop-types';
import { ignoreReturnFor, rethrowError } from 'promise-frites';
import { setValue, removeValue } from './is-form.utils';

const isForm = render => class extends React.Component {
		propTypes = {
			onSubmit: PropTypes.func.isRequired,
		}

		state = {
			values: {},
			errors: {},
			isSubmitting: false,
			wasSubmitted: false,
		};

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
			this.setState((state => ({ values: setValue(name, value, state.values) })));
		};

		removeFormField = (name) => {
			this.setState((state => ({ values: removeValue(name, state.values) })));
		}

		render() {
			return render({
				...this.props,
				form: {
					...this.state,
					setFormValue: this.setFormValue,
					addFormField: this.setFormValue,
					removeFormField: this.removeFormField,
					onSubmit: this.onSubmit,
				},
			});
		}
};
export default isForm;
