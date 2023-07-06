import * as S from "./styled";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import i18next from "i18next";
import { getFromLocalStorage, setToLocalStorage } from "~utils/ls.utils";

type TLanguateSelectorProps = {
  loading?: boolean;
};

export const LanguageSelector = ({
  loading = false,
}: TLanguateSelectorProps) => {
  const [langs] = useState(["uk", "ru"]);

  if (loading) {
    return <Skeleton borderRadius={10} height={40} width={75} />;
  }

  return (
    <S.Container>
      {langs.map((lang) => (
        <S.Item
          key={lang}
          style={{
            color:
              lang === getFromLocalStorage("i18nextLang") ? "white" : "#B6B6B6",
          }}
          onClick={() => {
            i18next.changeLanguage(lang);
            setToLocalStorage("i18nextLang", lang);
          }}
        >
          {lang.toUpperCase()}
        </S.Item>
      ))}
    </S.Container>
  );
};
