import * as S from "./styled";
import { useEffect, useState } from "react";
import i18n from "~i18n";
import LocalStorageService from "~services/local-storage.service";
import { createProviderLessContextHook } from "~common/createProviderLessContext";
import { useHref, useLocation, useMatch, useNavigate } from "react-router-dom";

const useLanguageContext = createProviderLessContextHook("uk");

export const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useLanguageContext();
  useEffect(() => {
    setSelectedLang(i18n.resolvedLanguage);
  }, []);

  const [langs] = useState(["uk", "ru"]);
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <S.Container>
      {langs.map((lang) => (
        <S.Item
          key={lang}
          style={{
            color: lang === selectedLang ? "white" : "#B6B6B6",
          }}
          onClick={() => {
            setSelectedLang(lang);
            i18n.changeLanguage(lang);
        
            LocalStorageService.set("i18next_lang", lang);
            const url =
              "/" +
              lang +
              "/" +
              location.pathname.slice(4, location.pathname.length);;
            console.log(url);
                navigate(url);
          }}
        >
          {lang.toUpperCase()}
        </S.Item>
      ))}
    </S.Container>
  );
};
