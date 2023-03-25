import { observer } from 'mobx-react';
import * as S from './styled';
import { useMediaQuery } from 'react-responsive';

import { Link } from 'react-router-dom';
import { LogoSvg } from '~components/svg/LogoSvg';
import { MapPinSvg } from '~components/svg/MapPinSvg';
import { SvgIcon } from '~components/svg/SvgIcon';
import { useCitiesStore } from '~hooks/use-cities-store';

import image from '../../assets/img/image_location.png';
import { useTranslation } from 'react-i18next';

export const SelectLocation = observer(() => {
  const { t } = useTranslation();
  const items = useCitiesStore().items;
  const isMobile = useMediaQuery({ query: '(max-width: 375px)' });
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
            {items.map((city) =>
              city.spots.map((spot) => (
                <li key={city.id + '-' + spot.id}>
                  <span>{city.name}</span>
                  <ul>
                    {items.map((city) =>
                      city.spots.map((spot) => (
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
                            <S.Location.Image src={image}>
                              {!image && (
                                <SvgIcon color={'white'} width={'100px'}>
                                  <LogoSvg />
                                </SvgIcon>
                              )}
                            </S.Location.Image>
                          </S.Location>
                        </Link>
                      )),
                    )}
                  </ul>
                </li>
              )),
            )}
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
