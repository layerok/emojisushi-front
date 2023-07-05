import { useTranslation } from "react-i18next";
import { useLocation, useRouteError } from "react-router-dom";
import { logApi } from "~api/log/log.api";
import { Container } from "~components/Container";

export const DefaultErrorBoundary = () => {
  const error = useRouteError();
  const location = useLocation();
  const { t } = useTranslation();

  if (error instanceof Error) {
    if (process.env.NODE_ENV === "production") {
      logApi.log({
        location: location,
        error: error.message,
        stack: error.stack,
      });
    }
  }

  return (
    <Container>
      <div>
        <h2 style={{ marginTop: 16 }}>{t("error-boundary.title")}</h2>
        <p style={{ marginTop: 4 }}>{t("error-boundary.subtitle")}</p>
      </div>
    </Container>
  );
};
