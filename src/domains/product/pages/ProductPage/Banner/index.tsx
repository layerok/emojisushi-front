import * as S from "./styled";
import Slide1Desktop from "./assets/1.5kg_dekstop.jpg";
import Slide1Mobile from "./assets/1.5kg_mobile.jpg";

import Slide2Desktop from "./assets/2kg_dekstop.jpg";
import Slide2Mobile from "./assets/2kg_mobile.jpg";

import Slide3Desktop from "./assets/kombo_dekstop.jpg";
import Slide3Mobile from "./assets/kombo_mobile.jpg";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { wrap } from "popmotion";
import { useBreakpoint2 } from "~common/hooks";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const images = [
  {
    desktop: Slide1Desktop,
    mobile: Slide1Mobile,
  },
  {
    desktop: Slide2Desktop,
    mobile: Slide2Mobile,
  },
  {
    desktop: Slide3Desktop,
    mobile: Slide3Mobile,
  },
] as const;

export const Banner = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const { isTablet, isDesktop } = useBreakpoint2();

  const activeImage = {
    src: images[imageIndex][isTablet || isDesktop ? "desktop" : "mobile"],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPage(([prevPage, prevDirection]) => [prevPage + 1, prevDirection]);
    }, 6000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <S.Container>
      <AnimatePresence initial={false} custom={direction}>
        <S.Slide
          key={page}
          $imageSrc={activeImage.src}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
    </S.Container>
  );
};
