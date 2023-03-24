import { createBreakpoint } from "react-use";
import { breakpointsInPixels } from "../custom-media";

export const useBreakpoint = createBreakpoint(breakpointsInPixels);

export const useIsMobile = () => {
  return useBreakpoint() === "mobile";
};

export const useIsDesktop = () => {
  return useBreakpoint() === "pc";
};

export const useIsTablet = () => {
  return useBreakpoint() === "tablet";
};
