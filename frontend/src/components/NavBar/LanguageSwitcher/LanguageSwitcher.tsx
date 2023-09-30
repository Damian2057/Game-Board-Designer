import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {

    const { i18n } = useTranslation();
    const languages = ['en', 'pl'];

    const changeLanguage = (lng: string | undefined) => {
        i18n.changeLanguage(lng);
    };

    return (
        <select onChange={(e) => changeLanguage(e.target.value)}>
            {languages.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>
    );
}

export default LanguageSwitcher;