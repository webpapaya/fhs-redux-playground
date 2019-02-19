import React from 'react';
import ProptTypes from 'prop-types';
import styles from './checkbox-input.css';
import isInput from '../lib/is-input';
import className from '../lib/class-name';


const Molecule = isInput({}, ({
	Input,
	Label,
	label,
	icon,
	showProps,
	...props
}) => (
	<Label className={className(styles.label)}>
		<Input
			className={className(
				styles.input,
				props.focused && styles.focused,
			)}
			{...props}
			type="checkbox"
		/>
		<span className={className(styles.slider)} />
	</Label>
));

Molecule.propTypes = {
	Input: ProptTypes.func.isRequired,
	Label: ProptTypes.func.isRequired,
	icon: ProptTypes.string,
	showProps: ProptTypes.bool,
	focused: ProptTypes.bool,
};

Molecule.defaultProps = {
	label: undefined,
	icon: undefined,
	showProps: false,
	focused: false,
};

export default Molecule;
