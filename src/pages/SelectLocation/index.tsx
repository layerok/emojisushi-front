import { observer } from "mobx-react";
import * as S from "./styled";
import { LogoSvg } from "~components/svg/LogoSvg";
import { MapPinSvg } from "~components/svg/MapPinSvg";
import { SvgIcon } from "~components/svg/SvgIcon";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "~common/hooks/useBreakpoint";
import { Cities, CitiesSkeleton } from "./components/City";
import { Await, useRouteLoaderData } from "react-router-dom";
import { loader } from "~components/EnsureLocation";
import { Suspense } from "react";

export const SelectLocation = observer(() => {
  const { t } = useTranslation();
  const data = useRouteLoaderData("ensureLocation") as ReturnType<
    typeof loader
  >["data"];

  const isMobile = useIsMobile();
  return (
    <S.Locations>
      <S.Locations.Container>
        <S.Locations.Head>
          <SvgIcon width={isMobile ? "160px" : "255px"}>
            <LogoSvg />
          </SvgIcon>
          <S.Locations.Label>
            {t("spotsModal.title")}
            <SvgIcon width={isMobile ? "20px" : "25px"} color={"white"}>
              <MapPinSvg />
            </SvgIcon>
          </S.Locations.Label>
        </S.Locations.Head>
        <S.Locations.Body>
          <Suspense fallback={<CitiesSkeleton />}>
            <Await
              resolve={data.cities}
              errorElement={<p>Error loading cities</p>}
            >
              {(cities) => <Cities items={cities} />}
            </Await>
          </Suspense>
        </S.Locations.Body>
      </S.Locations.Container>
    </S.Locations>
  );
});

export const Component = SelectLocation;

Object.assign(Component, {
  displayName: "LazySelectLocation",
});
