import * as S from "./styled"
import {useState} from "react";
import i18n from "~i18n";
import LocalStorageService from "~services/local-storage.service";

export const LanguageSelector = () => {

    const [langs] = useState(['uk', 'ru']);
    const [selectedLang, setSelectedLang] = useState(i18n.resolvedLanguage);
    return (
        <S.Container>
          {langs.map((lang) => (
            <S.Item key={lang} style={{
              color: lang === selectedLang ? 'white': '#B6B6B6'
            }} onClick={() => {
              setSelectedLang(lang);
              i18n.changeLanguage(lang);
              LocalStorageService.set('i18next_lang', lang);
            }}>{lang.toUpperCase()}</S.Item>
          ))}
        </S.Container>
    )
}
