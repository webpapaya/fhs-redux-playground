import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	en: {
		password: 'Password',
		email: 'Email',
		signIn: 'Sign in',
    signUp: 'Sign up',
    name: 'Name',
	},
	de: {
		password: 'Passwort',
		email: 'E-Mail',
		signIn: 'Anmelden',
    signUp: 'Registrieren',
    name: 'Name',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
