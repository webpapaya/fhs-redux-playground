import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, children }) => (
	<form onSubmit={onSubmit} style={{ width: '100%' }}>
		{children}
	</form>
);

Form.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default Form;
