import * as S from "./styled";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

type TLanguateSelectorProps = {
  loading?: boolean;
};

export const LanguageSelector = ({
  loading = false,
}: TLanguateSelectorProps) => {
  const { lang: selectedLang } = useParams();

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
