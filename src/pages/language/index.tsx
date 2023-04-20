import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/store/modules/common';
import { useSelector, useDispatch } from 'react-redux';
const lngs = [
	{ value: 'en', label: 'English' },
	{ value: 'zh', label: '中文' }
]

function Language() {
	const dispatch = useDispatch();
	const { languageValue } = useSelector((store: any) => store.common);
	// const { t, i18n } = useTranslation();
	const { t, i18n } = useTranslation(["translation", "welcome"])
	return (
		<div >
			<header>
				<select onChange={(evt) => {
					i18n.changeLanguage(evt.target.value)
					dispatch(setLanguage(evt.target.value))
				}} value={languageValue}>
					{lngs.map((lng) => (
						<option key={lng.value} value={lng.value} label={lng.label}
							style={{ fontWeight: i18n.resolvedLanguage === lng.value ? 'bold' : 'normal' }} />
					))}
				</select>
			</header>
			<main>
				<p>
					{t("welcome:welcome")}
				</p>
				<p>
					{t("translation:currentTime")}
				</p>
			</main>
		</div >
	);
}

export default Language;
