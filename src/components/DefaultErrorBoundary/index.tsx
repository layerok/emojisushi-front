import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useRouteError } from "react-router-dom";
import { logApi } from "~api/log/log.api";
import { Container } from "~components/Container";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";
import { useContext, useEffect } from "react";
import { NiceModalContext } from "@ebay/nice-modal-react";

export const DefaultErrorBoundary = () => {
  const error = useRouteError();
  const location = useLocation();
  const { t } = useTranslation();
  const modals = useContext(NiceModalContext);

  useEffect(() => {
    if (error instanceof Error) {
      if (process.env.NODE_ENV === "production") {
        logApi.log({
          location: location,
          error: error.message,
          stack: error.stack,
        });
      }
    }
  }, [error]);

  return (
    <Container>
      <div>
        <h2 style={{ marginTop: 16 }}>{t("error-boundary.title")}</h2>
        <p style={{ marginTop: 4 }}>{t("error-boundary.subtitle")}</p>
      </div>
    </Container>
  );
};
