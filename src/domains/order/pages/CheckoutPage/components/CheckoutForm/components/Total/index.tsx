import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Container = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
`;

export const Total = ({
  total,
  loading = false,
}: {
  total: number;
  loading?: boolean;
}) => {
  const { t } = useTranslation();

  if (loading) {
    return <Skeleton height={22} width={128} />;
  }
  return (
    <Container>
      {t("checkout.to_pay")} {total} ₴
    </Container>
  );
};
