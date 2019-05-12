/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {

	de: {
		signOut: 'Abmelden',
	},
	en: {
		signOut: 'Sign out',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
