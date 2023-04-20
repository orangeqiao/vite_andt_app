import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import dayjs from 'dayjs'
import { initLangage } from '@/utils/initLangage';
i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		lng: initLangage(),
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
i18n.services?.formatter?.add('DD/MM/YY', (value, lng, options) => {
	return dayjs(value).format('DD/MM/YY')
});

i18n.services?.formatter?.add('YYYY-MM-DD', (value, lng, options) => {
	return dayjs(value).format('YYYY-MM-DD')
});


export default i18n;