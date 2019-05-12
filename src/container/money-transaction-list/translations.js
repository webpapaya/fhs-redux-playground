/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		delete: 'Löschen',
	},
	en: {
		delete: 'Delete',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
