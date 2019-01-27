import React from 'react';
import styles from './form.css';
import isForm from '../../../lib/is-form';
import Form from '../../../components/form';
import NumberInput from '../../../components/number-input';
import SelectInput from '../../../components/select-input';
import Button from '../../../components/button';

export default isForm(({ form, users }) => (
	<Form {...form} className={styles['input-wrapper']}>
		<SelectInput
			label="User"
			name="userId"
			options={users.map(({ id, name }) => ({ value: id, label: name }))}
			{...form}
		/>
		<NumberInput
			name="amount"
			label="Amount"
			{...form}
		/>
		<Button type="submit" block disabled={form.isSubmitting}>
			{ 'Submit' }
		</Button>
	</Form>
));
