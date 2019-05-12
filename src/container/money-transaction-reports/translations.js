/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		credit: '{value, number, EUR} Schulden',
		debit: '{value, number, EUR} Guthaben',
		total: 'Summe',
	},
	en: {
		credit: '{value, number, EUR} Credit',
		debit: '{value, number, EUR} Debit',
		total: 'Total',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
