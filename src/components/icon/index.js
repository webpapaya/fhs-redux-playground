import React from 'react';
import PropTypes from 'prop-types';

const buildIcon = Svg => props =>
	<Svg {...props} />;

/* eslint-disable global-require */
export const NAMES = {
	money: buildIcon(require('./assets/money').default),
	settings: buildIcon(require('./assets/settings').default),
	edit: buildIcon(require('./assets/edit').default),
};
/* eslint-enable global-require */

const Icon = ({ name }) => {
	const Component = NAMES[name];
	return <Component width="22px" fill="white" />;
};

Icon.propTypes = {
	name: PropTypes.oneOf(Object.keys(NAMES)).isRequired,
};

export default Icon;
