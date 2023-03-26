import { useParams } from "react-router-dom";

export const useLang = () => {
  const { lang } = useParams();
  return lang;
};
