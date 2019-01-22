import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import NumberInput from '../../components/number-input';
import Button from '../../components/button';
import Select from '../../components/select-input';

const OPTIONS = [
	{ value: 'createdAt.asc', label: 'Date asc' },
	{ value: 'createdAt.desc', label: 'Date desc' },
	{ value: 'amount.asc', label: 'Amount asc' },
	{ value: 'amount.desc', label: 'Amount desc' },
];

export default isForm(({ form }) => (
	<Form {...form}>
		<NumberInput name="amount" label="Amount gte" {...form} />
		<Select 
			options={OPTIONS}
			name="order"
			label="Order"
			{...form}
		/>
		<Button type="submit" block disabled={form.isSubmitting}>
			{'Filter'}
		</Button>
	</Form>
));
