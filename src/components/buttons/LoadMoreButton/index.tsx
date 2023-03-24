import { UIButton } from "../UIButton";
import { ArrowsClockwiseSvg } from "../../svg/ArrowsClockwiseSvg";
import styled from "styled-components";
const RotateContainer = styled.div`
  animation: spin 4s linear infinite;
`;

export const LoadMoreButton = ({ text, loading = false, ...rest }) => {
  return (
    <UIButton {...rest} text={text}>
      {loading && (
        <RotateContainer>
          <ArrowsClockwiseSvg />
        </RotateContainer>
      )}
      {!loading && (
        <div>
          <ArrowsClockwiseSvg />
        </div>
      )}
    </UIButton>
  );
};
