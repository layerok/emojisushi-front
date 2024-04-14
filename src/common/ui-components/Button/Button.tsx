import { SkeletonWrap, SpinnerSvg, SvgIcon } from "~components";
import {
  forwardRef,
  PropsWithChildren,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import styled from "styled-components";

type IButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    showSkeleton?: boolean;
    loading?: boolean;
    filled?: boolean;
    startAdornment?: ReactNode;
  }
>;

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const {
      children,
      filled = false,
      startAdornment,
      showSkeleton = false,
      loading = false,
      ...rest
    } = props;

    return (
      <SkeletonWrap loading={showSkeleton}>
        <BaseButton $filled={filled} $loading={loading} {...rest} ref={ref}>
          {loading ? (
            <SvgIcon width={"25px"} color={"black"}>
              <SpinnerSvg />
            </SvgIcon>
          ) : (
            <>
              {startAdornment}
              <div
                style={{
                  flexShrink: 0,
                }}
              >
                {children}
              </div>
            </>
          )}
        </BaseButton>
      </SkeletonWrap>
    );
  }
);

const BaseButton = styled.button<{
  $loading: boolean;
  $filled: boolean;
}>`
  border: ${(props) => `1px solid ${props.theme.colors.brand}`};
  border-radius: ${({ theme }) => theme.borderRadius.smooth};
  padding: 7px 31px;
  min-width: 130px;
  height: 40px;
  color: ${({ theme, $filled }) => ($filled ? "black" : theme.colors.brand)};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-decoration: none;
  background-color: ${({ $loading, $filled, theme }) =>
    $loading || $filled ? theme.colors.brand : "transparent"};

  :hover {
    background: ${({ theme }) => theme.colors.brand};
    box-shadow: ${({ theme }) => theme.shadows.brandSofter};
    color: black;
  }
`;
