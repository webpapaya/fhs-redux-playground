/* eslint sort-keys: "error" */
import { buildUseTranslations } from '../../lib/i18n';

const MESSAGES = {
	de: {
		'somebodyOwesMe': 'Jemand schuldet mir',
		'iOweSomebody': 'Ich schulde jemanden',
		'amount': 'Betrag',
		'user': 'Nutzer',
		'submit': 'Speichern',
	},
	en: {
		'somebodyOwesMe': 'Sombody owes me',
		'iOweSomebody': 'I owe somebody',
		'amount': 'Amount',
		'user': 'User',
		'submit': 'Submit',
	},
};

export const useTranslation = buildUseTranslations(MESSAGES);
