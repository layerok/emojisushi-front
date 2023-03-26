import { observer } from 'mobx-react';
import * as S from './styled';

import { Link } from 'react-router-dom';
import { LogoSvg } from '~components/svg/LogoSvg';
import { MapPinSvg } from '~components/svg/MapPinSvg';
import { SvgIcon } from '~components/svg/SvgIcon';
import { useCitiesStore } from '~hooks/use-cities-store';

import { useTranslation } from 'react-i18next';
import { useIsMobile } from '~common/hooks/useBreakpoint';
import { useLang } from '~hooks';

export const SelectLocation = observer(() => {
  const { t } = useTranslation();
  const items = useCitiesStore().items;
  const isMobile = useIsMobile();
  const lang = useLang();
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
          <ul>
            {items.map((city) => (
              <li key={city.id}>
                <span>{city.name}</span>
                <ul>
                  {city.spots.map((spot) => (
                    <Link
                      to={
                        "/" +
                        lang +
                        "/" +
                        city.slug +
                        "/" +
                        spot.slug +
                        "/category"
                      }
                      key={city.id + "-" + spot.id}
                    >
                      <S.Location>
                        <S.Location.Content>
                          <S.Location.Head>
                            {t("common.address")}
                            <SvgIcon width={"15px"} color={"#FFE600"}>
                              <MapPinSvg />
                            </SvgIcon>
                          </S.Location.Head>
                          {spot.address}
                        </S.Location.Content>
                      </S.Location>
                    </Link>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </S.Locations.Body>
      </S.Locations.Container>
    </S.Locations>
  );
});

export const Component = SelectLocation;

Object.assign(Component, {
  displayName: 'LazySelectLocation',
});
