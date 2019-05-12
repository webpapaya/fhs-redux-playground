/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		'total': 'Summe',
		'credit': '{value, number, EUR} Schulden',
		'debit': '{value, number, EUR} Guthaben',
	},
	en: {
		'total': 'Total',
		'credit': '{value, number, EUR} Credit',
		'debit': '{value, number, EUR} Debit',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
