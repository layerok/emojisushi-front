import { generateMedia } from "styled-media-query";

export const breakpointsInPixels = {
  pc: 1280,
  tablet: 768,
  mobile: 360,
};

export const breakpoints = {
  pc: breakpointsInPixels.pc + "px",
  tablet: breakpointsInPixels.tablet + "px",
  mobile: breakpointsInPixels.mobile + "px",
};

const customMedia = generateMedia(breakpoints);

export default customMedia;
