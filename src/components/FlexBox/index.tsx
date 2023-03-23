import * as S from "./styled";
import {forwardRef, HTMLProps, PropsWithChildren} from "react";

type GlobalValue = 'inherit' | 'initial' | 'unset';
type PositionValue = 'flex-start' | 'flex-end' | 'start' | 'end' |  'left' | 'right' | 'center';
type DistributionValue = 'stretch'  | 'space-between' | 'space-around' | 'space-evenly';
type AxisValue = 'baseline';

export type IAlignItems = PositionValue | AxisValue | DistributionValue | GlobalValue;
export type IJustifyContent = PositionValue | AxisValue | DistributionValue | GlobalValue;
export type IJustifyItems = PositionValue | AxisValue | DistributionValue | GlobalValue;
export type IFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';


type IProps = HTMLProps<HTMLDivElement> & PropsWithChildren<{
  alignItems?: IAlignItems;
  justifyContent?: IJustifyContent;
  flexDirection?: IFlexDirection;
  mobileFirst?: boolean;
}>

export const FlexBox = forwardRef<HTMLDivElement, IProps>((
    {
        alignItems = "start",
        flexDirection = "row",
        justifyContent = "start",
        children,
        ...rest
    }, ref
) => {
    return (
        <S.Flex
            ref={ref}
            alignItems={alignItems}
            flexDirection={flexDirection}
            justifyContent={justifyContent}
            {...rest}
        >{children}</S.Flex>
    )
})
