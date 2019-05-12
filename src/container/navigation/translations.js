import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	en: {
		signOut: 'Sign out',
	},
	de: {
		signOut: 'Abmelden',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
