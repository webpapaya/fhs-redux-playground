import React from 'react';
import isInput from '../lib/is-input';
import className from '../lib/class-name';
import styles from './base-input.css';

export default isInput({}, ({
	Select,
	Label,
	Option,
	options,
	noSelectionText,
	label,
	...props
}) => (
	<div>
		<Label className={styles.label}>{ label }</Label>
		<Select
			{...props}
			className={className(
				styles.input,
				props.focused && styles.focused,
			)}
		>
			<Option value="">{ noSelectionText || 'Please select' }</Option>
			{ options.map(({ value, label: l }) => (<Option key={value} value={value}>{ l }</Option>))}
		</Select>
	</div>
));
