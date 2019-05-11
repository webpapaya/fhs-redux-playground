import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	'en': {
		password: 'Password',
		email: 'Email',
		signIn: 'Sign in',
		signUp: 'Sign up'
	},
	'de': {
		password: 'Passwort',
		email: 'E-Mail',
		signIn: 'Anmelden',
		signUp: 'Registrieren'
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);



