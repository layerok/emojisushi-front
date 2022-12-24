import {createBreakpoint} from "react-use";
import {breakpointsInPixels} from "../custom-media";

export const useBreakpoint = createBreakpoint(breakpointsInPixels);