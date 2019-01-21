import React from 'react';
import { q, where, like } from 'datenkrake';
import isForm from '../../lib/is-form';
import Form from '../../components/form';

import TextInput from '../../components/text-input';
import NumberInput from '../../components/number-input';
import SelectInput from '../../components/select-input';
import Button from '../../components/button';

export default isForm(({ form, users, onUserLoad }) => (
	<Form {...form}>
		<NumberInput
			name="amount"
			label="Amount"
			{...form}
		/>
		<TextInput
			label="Debitor"
			name="debitorId"
			onChange={evt => onUserLoad(q(where({ name: like(`%${evt.target.value}%`, { caseSensitive: false }) })))}
			{...form}
		/>
		<SelectInput
			label="Debitor"
			name="debitorId"
			options={users.map(({ id, name }) => ({ value: id, label: name }))}
			{...form}
		/>
		<SelectInput
			label="Creditor"
			name="creditorId"
			options={users.map(({ id, name }) => ({ value: id, label: name }))}
			{...form}
		/>
		<Button type="submit" disabled={form.isSubmitting}>
			{ 'Submit' }
		</Button>
	</Form>
));
