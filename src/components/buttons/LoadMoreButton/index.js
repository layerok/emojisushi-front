import {UIButton} from "../UIButton";
import {ArrowsClockwiseSvg} from "../../svg/ArrowsClockwiseSvg";
import styled, {css} from "styled-components";
import {ifProp} from "styled-tools";
const RotateContainer = styled.div`
  ${ifProp('loading', css`
    animation: spin 4s linear infinite;
  `)}
`

export const LoadMoreButton = (
    {
        text,
        loading = false,
        ...rest
    }
) => {
    return (
        <UIButton {...rest} text={text}>
            <RotateContainer loading={loading}>
                <ArrowsClockwiseSvg/>
            </RotateContainer>
        </UIButton>
    );
}