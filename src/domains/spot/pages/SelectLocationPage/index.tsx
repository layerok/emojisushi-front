import * as S from "./styled";
import { MapPinSvg, LogoSvg, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { Cities, CitiesSkeleton } from "./components/City";
import { citiesQuery } from "~queries/cities.query";
import { useQuery } from "@tanstack/react-query";

export const SelectLocationPage = () => {
  const { t } = useTranslation();
  const { data: cities, isLoading } = useQuery(citiesQuery);

  return (
    <S.Locations>
      <S.Locations.Container>
        <S.Locations.Head>
          <S.LogoWrapper>
            <SvgIcon width={"100%"}>
              <LogoSvg />
            </SvgIcon>
          </S.LogoWrapper>

          <S.Locations.Label>
            {t("spotsModal.title")}
            <S.MapWrapper>
              <SvgIcon width={"100%"} color={"white"}>
                <MapPinSvg />
              </SvgIcon>
            </S.MapWrapper>
          </S.Locations.Label>
        </S.Locations.Head>
        <S.Locations.Body>
          {isLoading ? <CitiesSkeleton /> : <Cities items={cities.data} />}
        </S.Locations.Body>
      </S.Locations.Container>
    </S.Locations>
  );
};

export const Component = SelectLocationPage;

Object.assign(Component, {
  displayName: "LazySelectLocationPage",
});
