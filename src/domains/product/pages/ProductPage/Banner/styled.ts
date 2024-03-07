import styled from "styled-components";
import media from "src/common/custom-media";

const Slide = styled.div<{
  $imageSrc: string;
}>`
  background-image: url("${(props) => props.$imageSrc}");
  background-size: cover;
  background-position: center;
  inset: 0;
  position: absolute;
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 130px;

  ${media.greaterThan("tablet")`
    height: 180px;
  `};

  ${media.greaterThan("pc")`
    height: 236px;
  `};
`;

const ThumbsContainer = styled.div`
  position: absolute;
  left: 50%;
  display: flex;
  transform-origin: center;
  transform: translateX(-50%);
  bottom: -30px;

  .use-spring-carousel-thumbs-wrapper {
    column-gap: 5px;
  }
`;

const Dot = styled.div<{
  $isActive: boolean;
}>`
  border-radius: 100%;
  cursor: pointer;
  width: 10px;
  height: 10px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.brand : theme.colors.canvas.inset4};
`;

export { Container, Slide, ThumbsContainer, Dot };
