import { useTranslation } from "react-i18next";
import { useLocation, useRouteError } from "react-router-dom";
import { logApi } from "~api/log/log.api";
import { Container } from "~components/Container";
import { useEffect } from "react";

export const DefaultErrorBoundary = () => {
  const error = useRouteError();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (error instanceof Error) {
      if (process.env.NODE_ENV === "production") {
        logApi.log({
          location: location,
          navigator: {
            onLine: navigator.onLine,
            userAgent: window.navigator.userAgent,
          },
          error: error.message,
          stack: error.stack,
        });
      }
    }
  }, [error]);

  let title = t("error-boundary.title");
  let subtitle = t("error-boundary.subtitle");

  if (!navigator.onLine) {
    title = t("internetConnectionLost.title");
    subtitle = t("internetConnectionLost.subtitle");
  }

  return (
    <Container>
      <div>
        <h2 style={{ marginTop: 16 }}>{title}</h2>
        <p style={{ marginTop: 4 }}>{subtitle}</p>
      </div>
    </Container>
  );
};
