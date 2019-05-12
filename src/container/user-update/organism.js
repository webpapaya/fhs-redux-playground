import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';
import Button from '../../components/button';
import { useTranslation } from './translations';

export default isForm(({ form }) => {
	const { t } = useTranslation();
	return (
		<Form {...form}>
			<TextInput name="name" label={t('name')} {...form} />
			<Button type="submit">
				{ t('save') }
			</Button>
		</Form>
	);
});
