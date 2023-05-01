import { generateMedia } from "styled-media-query";

export const PC_BREAKPOINT_KEY = "pc";
export const MOBILE_BREAKPOINT_KEY = "mobile";
export const TABLET_BREAKPOINT_KEY = "tablet";

export const breakpointsInPixels = {
  [PC_BREAKPOINT_KEY]: 1280,
  [TABLET_BREAKPOINT_KEY]: 768,
  [MOBILE_BREAKPOINT_KEY]: 375,
};

export const breakpoints = {
  [PC_BREAKPOINT_KEY]: breakpointsInPixels.pc + "px",
  [TABLET_BREAKPOINT_KEY]: breakpointsInPixels.tablet + "px",
  [MOBILE_BREAKPOINT_KEY]: breakpointsInPixels.mobile + "px",
};

const customMedia = generateMedia(breakpoints);

export default customMedia;

export const media = customMedia;
