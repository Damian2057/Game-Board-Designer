import { useTranslation } from 'react-i18next';
import {useState} from "react";

function LanguageSwitcher() {

    const { i18n } = useTranslation();
    const [lang, setLang] = useState(localStorage.getItem('selectedLanguage') || 'en');
    const languages = ['en', 'pl'];

    const changeLanguage = (lng: string | undefined) => {
        localStorage.setItem('selectedLanguage', lng || 'en');
        i18n.changeLanguage(lng);
    };

    return (
        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={lang}>
            {languages.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>
    );
}

export default LanguageSwitcher;