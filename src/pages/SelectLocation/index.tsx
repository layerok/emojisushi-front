import { observer } from "mobx-react";
import * as S from "./styled";
import { MapPinSvg, LogoSvg, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "~common/hooks";
import { Cities, CitiesSkeleton } from "./components/City";
import { Await, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { City } from "~models";
import { IGetCitiesResponse } from "~api/access.api";

export const SelectLocation = observer(() => {
  const { t } = useTranslation();
  const { cities } = useRouteLoaderData("ensureLocation") as any;

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
              resolve={cities}
              errorElement={<p>Error loading locations</p>}
            >
              {(cities: IGetCitiesResponse) => (
                <Cities items={cities.data.map((json) => new City(json))} />
              )}
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
