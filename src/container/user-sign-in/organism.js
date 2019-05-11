import React from 'react';
import isForm from '../../lib/is-form';
import Form from '../../components/form';
import TextInput from '../../components/text-input';
import PasswordInput from '../../components/password-input';
import Link from '../../components/link';
import Button from '../../components/button';
import styles from './organism.css';
import { useTranslation } from './translations';

export default isForm(({ form }) => {
	const { t } = useTranslation();
	return (
		<Form {...form}>
			<TextInput name="email" label={t('email')} {...form} />
			<PasswordInput name="password" label={t('password')} {...form} />

			<nav className={styles.navigation}>
				<Button type="submit" block disabled={form.isSubmitting}>
					{t('signIn')}
				</Button>
				<Link to="user-sign-up">{t('signUp')}</Link>
			</nav>
		</Form>
	);
});
