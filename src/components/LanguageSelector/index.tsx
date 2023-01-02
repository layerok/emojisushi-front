import * as S from "./styled"
import {useState} from "react";
import i18n from "~i18n";

export const LanguageSelector = () => {

    const [langs] = useState(['uk', 'ru']);
    const [selectedLang, setSelectedLang] = useState(i18n.resolvedLanguage);
    return (
        <S.Container>
          {langs.map((lang) => (
            <S.Item style={{
              color: lang === selectedLang ? 'white': '#B6B6B6'
            }} onClick={() => {
              setSelectedLang(lang);
              i18n.changeLanguage(lang);
            }}>{lang.toUpperCase()}</S.Item>
          ))}
        </S.Container>
    )
}
