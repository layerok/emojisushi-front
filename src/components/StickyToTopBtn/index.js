import { SvgIcon } from "../svg/SvgIcon";
import { ArrowUpSvg } from "../svg/ArrowUpSvg";
import { Sticky } from "../Sticky";
import { useWindowScroll } from "react-use";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-bottom: 32px;

  @media (max-width: 979px) {
    transform: scale(0.8);
    padding-bottom: 0;
  }
`;

export const StickyToTopBtn = () => {
  const scroll = useWindowScroll();
  return (
    <Sticky
      show={scroll.y > 500}
      bottom={"calc(7% + 100px)"}
      right={"calc(2% + 31px)"}
    >
      <Wrapper>
        <SvgIcon
          style={{
            cursor: "pointer",
          }}
          width={"34px"}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <ArrowUpSvg />
        </SvgIcon>
      </Wrapper>
    </Sticky>
  );
};
