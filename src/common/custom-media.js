import { generateMedia } from "styled-media-query";

export const breakpoints = {
    pc: "1280px",
    tablet: "768px",
    mobile: "360px"
}

const customMedia = generateMedia(breakpoints);

export default customMedia;