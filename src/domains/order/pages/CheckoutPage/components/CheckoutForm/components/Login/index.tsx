import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { AuthModal, FlexBox } from "~components";
import { User } from "~models";
import styled from "styled-components";

const Text = styled.p`
  color: #ffe600;
  margin-left: 5px;
`;

export const Login = ({
  user,
  loading = false,
}: {
  user?: User;
  loading?: boolean;
}) => {
  const { t } = useTranslation();
  if (loading) {
    return <Skeleton height={18} style={{ marginBottom: "20px" }} />;
  }
  return (
    !user && (
      <FlexBox style={{ marginBottom: "20px" }}>
        {t("checkout.alreadyHaveAccount")}
        <AuthModal>
          <Text>{t("common.login")}</Text>
        </AuthModal>
      </FlexBox>
    )
  );
};
