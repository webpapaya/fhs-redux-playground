/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		name: 'Name',
		save: 'Speichern',
	},
	en: {
		name: 'Name',
		save: 'Update user',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
