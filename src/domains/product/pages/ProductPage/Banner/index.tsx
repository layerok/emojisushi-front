import * as S from "./styled";
import Slide1Desktop from "./assets/1.5kg_dekstop.jpg";
import Slide1Mobile from "./assets/1.5kg_mobile.jpg";
import Slide2Desktop from "./assets/2kg_dekstop.jpg";
import Slide2Mobile from "./assets/2kg_mobile.jpg";
import Slide3Desktop from "./assets/kombo_dekstop.jpg";
import Slide3Mobile from "./assets/kombo_mobile.jpg";
import React, { useState } from "react";
import { useTransitionCarousel } from "react-spring-carousel";
import { useBreakpoint2 } from "~common/hooks";
import { useEffect } from "react";

const images = [
  {
    id: "0",
    desktop: Slide1Desktop,
    mobile: Slide1Mobile,
  },
  {
    id: "1",
    desktop: Slide2Desktop,
    mobile: Slide2Mobile,
  },
  {
    id: "2",
    desktop: Slide3Desktop,
    mobile: Slide3Mobile,
  },
] as const;

const SLIDE_CHANGE_INTERVAL = 2500;

export const Banner = () => {
  const { isTablet, isDesktop } = useBreakpoint2();

  const [activeItem, setActiveItem] = useState<string>(images[0].id);

  const {
    carouselFragment,
    thumbsFragment,
    slideToPrevItem,
    getIsActiveItem,
    useListenToCustomEvent,
    slideToItem,
    slideToNextItem,
  } = useTransitionCarousel({
    withLoop: true,
    withThumbs: true,
    items: images.map((image) => {
      const imageSrc = image[isTablet || isDesktop ? "desktop" : "mobile"];

      return {
        id: image.id,
        renderItem: <S.Slide $imageSrc={imageSrc} />,
        renderThumb: (
          <S.Dot
            $isActive={image.id === activeItem}
            onClick={() => slideToItem(image.id)}
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
    // You MUST add the slide methods to the dependency list useEffect!
  }, [slideToNextItem]);

  return (
    <S.Container>
      {carouselFragment}
      <S.ThumbsContainer>{thumbsFragment}</S.ThumbsContainer>
    </S.Container>
  );
};
