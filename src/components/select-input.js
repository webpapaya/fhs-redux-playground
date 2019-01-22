import React from 'react';
import isInput from '../lib/is-input';

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
		<Label>{ label }</Label>
		<Select {...props}>
			<Option value="">{ noSelectionText || 'Please select' }</Option>
			{ options.map(({ value, label: l }) => (<Option key={value} value={value}>{ l }</Option>))}
		</Select>
	</div>
));
