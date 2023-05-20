import styled from "styled-components";
import { prop, theme } from "styled-tools";
import media from "src/common/custom-media";

const Category = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  padding-bottom: 50px;

  ${media.lessThan("mobile")`
   padding-top: 10px;
   padding-bottom: 60px;
  `}
`;

Category.Container = styled.div`
  margin: 0 auto;
  max-width: 564px;
  width: 100%;

  padding: 0 12px;
`;

Category.Label = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;

  gap: 10px;

  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  text-transform: uppercase;
  color: #fff;

  ${media.lessThan("mobile")`
    font-size: 16px;
    line-height: 20px;
  `}
`;

Category.Image = styled.div`
  flex-shrink: 0;

  width: 100px;
  height: 100px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, #1c1c1c 0%, rgba(28, 28, 28, 0) 100%);
    pointer-events: none;
  }
`;

Category.Items = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

Category.List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  ${media.lessThan("tablet")`
      flex-direction: column;
      gap: 15px;
    `}
`;

const IconWrapper = styled.div`
  width: 25px;
  ${media.lessThan("tablet")`
width: 20px;
`}
`;

export { Category, IconWrapper };
