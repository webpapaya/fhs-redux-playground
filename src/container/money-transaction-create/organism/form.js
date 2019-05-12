import React from 'react';
import styles from './form.css';
import isForm from '../../../lib/is-form';
import Form from '../../../components/form';
import NumberInput from '../../../components/number-input';
import SelectInput from '../../../components/select-input';
import Button from '../../../components/button';
import { useTranslation } from '../translations';

export default isForm(({ form, users }) => {
	const { t } = useTranslation();
	return (
		<Form {...form} className={styles['input-wrapper']}>
			<SelectInput
				label={t('user')}
				name="userId"
				options={users.map(({ id, name }) => ({ value: id, label: name }))}
				{...form}
			/>
			<NumberInput
				name="amount"
				label={t('amount')}
				{...form}
			/>
			<Button type="submit" block disabled={form.isSubmitting}>
				{ t('submit') }
			</Button>
		</Form>
	);
});
