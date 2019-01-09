import React from 'react';
import ProptTypes from 'prop-types';
import styles from './base-input.css';
import className from '../lib/class-name';


const Molecule = ({
	Input,
	Label,
	label,
	icon,
	showProps,
	...props
}) => (
	<div>
		<Label className={className(styles.label)}>
			{ label }
			{' '}
			{ icon }
		</Label>
		<Input
			className={className(
				styles.input,
				props.focused && styles.focused,
			)}
			{...props}
		/>
		{ showProps && <div>{ JSON.stringify(props)}</div> }
	</div>
);

Molecule.propTypes = {
	Input: ProptTypes.func.isRequired,
	Label: ProptTypes.func.isRequired,
	label: ProptTypes.string.isRequired,
	icon: ProptTypes.string,
	showProps: ProptTypes.bool,
	focused: ProptTypes.bool,
};

Molecule.defaultProps = {
	icon: undefined,
	showProps: false,
	focused: false,
};

export default Molecule;
