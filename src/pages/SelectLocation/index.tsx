import * as S from "./styled";
import { MapPinSvg, LogoSvg, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "~common/hooks";
import { Cities, CitiesSkeleton } from "./components/City";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { City } from "~models";
import { IGetCitiesRes } from "~api/types";
import { queryClient } from "~query-client";
import { citiesQuery } from "~queries/cities.query";

export const SelectLocation = () => {
  const { t } = useTranslation();
  const { cities } = useLoaderData() as any;

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
              {(cities: IGetCitiesRes) => (
                <Cities items={cities.data.map((json) => new City(json))} />
              )}
            </Await>
          </Suspense>
        </S.Locations.Body>
      </S.Locations.Container>
    </S.Locations>
  );
};

export const Component = SelectLocation;

Object.assign(Component, {
  displayName: "LazySelectLocation",
});

export const loader = () => {
  return defer({
    cities:
      queryClient.getQueryData(citiesQuery.queryKey) ??
      queryClient.fetchQuery(citiesQuery),
  });
};
