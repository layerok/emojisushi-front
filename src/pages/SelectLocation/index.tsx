import { observer } from 'mobx-react';
import * as S from './styled';

import { Link } from 'react-router-dom';
import { LogoSvg } from '~components/svg/LogoSvg';
import { MapPinSvg } from '~components/svg/MapPinSvg';
import { SvgIcon } from '~components/svg/SvgIcon';
import { useCitiesStore } from '~hooks/use-cities-store';

import { useTranslation } from 'react-i18next';
import { useIsMobile } from '~common/hooks/useBreakpoint';

export const SelectLocation = observer(() => {
  const { t } = useTranslation();
  const items = useCitiesStore().items;
  const isMobile = useIsMobile();

  const getUrl = process.env.REACT_APP_API_BASE_URL.slice(0, -3);
  return (
    <S.Locations>
      <S.Locations.Container>
        <S.Locations.Head>
          <SvgIcon width={isMobile ? '160px' : '255px'}>
            <LogoSvg />
          </SvgIcon>
          <S.Locations.Label>
            {t('spotsModal.title')}
            <SvgIcon width={isMobile ? '20px' : '25px'} color={'white'}>
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
                      to={'/' + city.slug + '/' + spot.slug + '/category'}
                      key={city.id + '-' + spot.id}
                    >
                      <S.Location>
                        <S.Location.Content>
                          <S.Location.Head>
                            Адреса
                            <SvgIcon width={'15px'} color={'#FFE600'}>
                              <MapPinSvg />
                            </SvgIcon>
                          </S.Location.Head>
                          {city.name}, {spot.name}
                        </S.Location.Content>

                        <S.Location.Image src={getUrl + 'storage/app/media' + spot.cover}>
                          {!spot.cover && (
                            <SvgIcon color={'white'} width={'100px'}>
                              <LogoSvg />
                            </SvgIcon>
                          )}
                        </S.Location.Image>
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
