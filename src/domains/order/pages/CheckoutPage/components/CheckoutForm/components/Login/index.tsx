import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { AuthModal, FlexBox } from "~components";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { IUser } from "~api/types";

const Text = styled.p`
  color: #ffe600;
  margin-left: 5px;
`;

export const Login = ({
  user,
  loading = false,
}: {
  user?: IUser;
  loading?: boolean;
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  if (loading) {
    return <Skeleton height={18} style={{ marginBottom: "20px" }} />;
  }
  return (
    !user && (
      <FlexBox style={{ marginBottom: "20px" }}>
        {t("checkout.alreadyHaveAccount")}
        <AuthModal redirect_to={location.pathname}>
          <Text>{t("common.login")}</Text>
        </AuthModal>
      </FlexBox>
    )
  );
};
