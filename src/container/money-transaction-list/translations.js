import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	en: {
		delete: 'Delete',
	},
	de: {
		delete: 'Löschen',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
