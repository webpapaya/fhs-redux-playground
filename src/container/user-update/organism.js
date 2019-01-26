import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';
import Button from '../../components/button';

export default isForm(({ form }) => (
	<Form {...form}>
		<TextInput name="name" label="Name" {...form} />
		<Button type="submit">
			{ 'Save' }
		</Button>
	</Form>
));
