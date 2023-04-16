import * as S from "./styled";
import { useEffect, useState } from "react";
import i18n from "~i18n";
import LocalStorageService from "~services/local-storage.service";
import { createProviderLessContextHook } from "~common/createProviderLessContext";
import { useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const useLanguageContext = createProviderLessContextHook("uk");

type TLanguateSelectorProps = {
  loading?: boolean;
};

export const LanguageSelector = ({
  loading = false,
}: TLanguateSelectorProps) => {
  const [selectedLang, setSelectedLang] = useLanguageContext();
  useEffect(() => {
    setSelectedLang(i18n.resolvedLanguage);
  }, []);

  const [langs] = useState(["uk", "ru"]);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <Skeleton borderRadius={10} height={40} width={75} />;
  }

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
            const currentSegments = location.pathname.split("/");
            const nextSegments = [lang, ...currentSegments.splice(2)];
            const nextUrl = "/" + nextSegments.join("/");
            navigate(nextUrl);
          }}
        >
          {lang.toUpperCase()}
        </S.Item>
      ))}
    </S.Container>
  );
};
