import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	en: {
		name: 'Name',
		save: 'Update user',
	},
	de: {
		name: 'Name',
		save: 'Speichern',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
