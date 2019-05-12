import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	en: {
		amountFilter: 'Amount bigger than',
		sortBy: 'Sort by',
		dateAsc: 'Date asc',
		dateDesc: 'Date desc',
		amountAsc: 'Amound asc',
		amountDesc: 'Amount desc',
	},
	de: {
		amountFilter: 'Betrag höher als',
		sortBy: 'Sortierung',
		dateAsc: 'Datum aufsteigend',
		dateDesc: 'Datum absteigend',
		amountAsc: 'Betrag aufsteigend',
		amountDesc: 'Betrag absteigend',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
