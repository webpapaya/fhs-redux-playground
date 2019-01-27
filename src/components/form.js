import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, children, className }) => (
	<form onSubmit={onSubmit} style={{ width: '100%' }} className={className}>
		{children}
	</form>
);

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

Form.defaultProps = {
	className: undefined,
};

export default Form;
