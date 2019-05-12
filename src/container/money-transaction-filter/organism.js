import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import NumberInput from '../../components/number-input';
import Select from '../../components/select-input';
import styles from './organism.css';
import { useTranslation } from './translations';

export default isForm(({ form }) => {
	const { t } = useTranslation();
	const options = [
		{ value: 'createdAt.asc', label: t('dateAsc') },
		{ value: 'createdAt.desc', label: t('dateDesc') },
		{ value: 'amount.asc', label: t('amountAsc') },
		{ value: 'amount.desc', label: t('amountDesc') },
	];

	return (
		<Form {...form} className={styles['form-wrapper']}>
			<NumberInput
				name="amount"
				label={t('amountFilter')}
				onChange={form.onSubmit}
				{...form}
			/>
			<Select
				options={options}
				name="order"
				label={t('sortBy')}
				onChange={form.onSubmit}
				{...form}
			/>
		</Form>
	);
});
