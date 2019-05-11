import React, { useContext, useState } from 'react';
import IntlMessageFormat from 'intl-messageformat'

const path = (path, object) => {
	return path.reduce((value, chunk) => {
		if (chunk in value) { return value[chunk]; }
		return undefined;
	}, object || {});
}

const t = (message, locale, options = {}) => {
	var msg = new IntlMessageFormat(message, locale);
	return msg.format(options)
}

const LocaleContext = React.createContext({ locale: 'en-US', setLocale: () => {} });
export const Locale = ({ children }) => {
	const [locale, setLocale] = useState('en-US');
	return (
		<LocaleContext.Provider value={{ locale, setLocale }}>
			{ children }
		</LocaleContext.Provider>
	)
}
export const buildUseTranslations = (messages) => () => {
	const { locale, setLocale } = useContext(LocaleContext);
	const languageCode = locale.split('-')[0];
	return {
		setLocale,
		t: (id, options = {}) => {
			const message = path([languageCode, id], messages) || path([locale, id], messages);
			return t(message, locale, options);
		},
	};
}
