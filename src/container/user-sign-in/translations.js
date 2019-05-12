/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		email: 'E-Mail',
		password: 'Passwort',
		signIn: 'Anmelden',
		signUp: 'Registrieren',
	},
	en: {
		email: 'Email',
		password: 'Password',
		signIn: 'Sign in',
		signUp: 'Sign up',
	},

};

export const useTranslation = buildUseTranslations(MESSAGES);
