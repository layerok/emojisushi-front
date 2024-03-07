import * as S from "./styled";
import React, { useState } from "react";
import { useTransitionCarousel } from "react-spring-carousel";
import { useBreakpoint2 } from "~common/hooks";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";
import { FlexBox } from "~components";

const SLIDE_CHANGE_INTERVAL = 2500;

type BannerItem = {
  id: string;
  desktop_image: string;
  mobile_image: string;
  onClick?: () => void;
};

enum BannerIdEnum {
  LoadingSlide = "loading_slide",
}

export const Banner = (props: { items: BannerItem[]; loading?: boolean }) => {
  const { items, loading = false } = props;
  const { isTablet, isDesktop } = useBreakpoint2();

  const [activeItem, setActiveItem] = useState<string>(
    loading ? BannerIdEnum.LoadingSlide : items[0]?.id
  );

  const theme = useTheme();

  useEffect(() => {
    setActiveItem(items[0]?.id);
  }, [loading]);

  const {
    carouselFragment,
    thumbsFragment,
    useListenToCustomEvent,
    slideToItem,
    slideToNextItem,
  } = useTransitionCarousel({
    withLoop: true,
    withThumbs: true,
    items: loading
      ? [
          {
            id: BannerIdEnum.LoadingSlide,
            renderItem: (
              <Skeleton
                borderRadius={theme.borderRadius.default}
                width={"100%"}
                height={"100%"}
              />
            ),
            renderThumb: (
              <FlexBox
                style={{
                  gap: 5,
                }}
              >
                <Skeleton width={10} height={10} borderRadius={"100%"} />
                <Skeleton width={10} height={10} borderRadius={"100%"} />
                <Skeleton width={10} height={10} borderRadius={"100%"} />
              </FlexBox>
            ),
          },
        ]
      : items.map((item) => {
          const imageSrc =
            item[isTablet || isDesktop ? "desktop_image" : "mobile_image"];

          return {
            id: item.id,
            renderItem: <S.Slide onClick={item.onClick} $imageSrc={imageSrc} />,
            renderThumb: (
              <S.Dot
                $isActive={item.id === activeItem}
                onClick={() => slideToItem(item.id)}
              />
            ),
          };
        }),
  });

  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      setActiveItem(event.nextItem.id);
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      slideToNextItem();
    }, SLIDE_CHANGE_INTERVAL);
    return () => {
      window.clearInterval(timer);
    };
  }, [slideToNextItem]);

  return (
    <S.Container>
      {carouselFragment}
      <S.ThumbsContainer>{thumbsFragment}</S.ThumbsContainer>
    </S.Container>
  );
};
