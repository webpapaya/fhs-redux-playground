/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		amountAsc: 'Betrag aufsteigend',
		amountDesc: 'Betrag absteigend',
		amountFilter: 'Betrag höher als',
		dateAsc: 'Datum aufsteigend',
		dateDesc: 'Datum absteigend',
		sortBy: 'Sortierung',
	},
	en: {
		amountAsc: 'Amound asc',
		amountDesc: 'Amount desc',
		amountFilter: 'Amount bigger than',
		dateAsc: 'Date asc',
		dateDesc: 'Date desc',
		sortBy: 'Sort by',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
