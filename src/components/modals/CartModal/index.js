import {BaseModal} from "../BaseModal";
import * as S from "./styled";
import {products} from "../../../common/mock/data/products";
import {LightCounter} from "../../Counter";
import {FlexBox} from "../../FlexBox";
import {Price} from "../../Price";
import {CloseModalIcon} from "../CloseModalIcon";
import {CloseIcon} from "../../CloseIcon";
import {ButtonOutline} from "../../buttons/Button";
import {CustomScrollbars} from "../../../layout/CustomScrollbar";
import {useCounter, useWindowSize} from "react-use";
import {useEffect, useState} from "react";
import {useDebounce} from "../../../common/hooks/useDebounce";
import {useBreakpoint} from "../../../common/hooks/useBreakpoint";
import {ConfirmActionPopover} from "../../popovers/ConfirmActionPopover";

const CartItem = ({item}) => {
    const [count, {inc, dec}] = useCounter(1, 100, 1);

    return (<S.Item>
        <S.Item.RemoveIcon>
            <ConfirmActionPopover onConfirm={({close}) => {
                close();
            }} onCancel={({close}) => {
                close();
            }} text={"Вы уверены что хотите удалить этот товар с корзины?"}>
                <CloseIcon color={"#4A4A4A"}/>
            </ConfirmActionPopover>
        </S.Item.RemoveIcon>
        <S.Item.Img src={item.image}/>
        <S.Item.Info>
            <S.Item.Name title={item.name}>
                {item.name}
            </S.Item.Name>
            <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
                <S.Item.Counter>
                    <LightCounter handleIncrement={() => {
                        inc();
                    }} handleDecrement={() => {
                        dec();
                    }} count={count}/>
                </S.Item.Counter>
                <Price newPrice={item.new_price} oldPrice={item.old_price}/>
            </FlexBox>
        </S.Item.Info>
    </S.Item>)
}


export const CartModal = ({children}) => {

    const windowSize = useWindowSize();
    const [height, setHeight] = useState(windowSize.height);

    const debounceHeight = useDebounce(() => {
        setHeight(windowSize.height)
    }, 300)

    const breakpoint = useBreakpoint();

    const overlayStyles = {
        justifyItems: breakpoint === 'mobile' ? 'center':'end',
        alignItems: breakpoint === 'mobile' ? 'center': 'start',
        background: "rgba(0, 0, 0, 0.4)",
        display: 'grid',
        zIndex: 999
    };

    // max cart items wrapper height is 500px and min is 300px
    // 252px is sum of heights another element in cart modal
    const finalHeight = Math.max(Math.min(height - 252, 500), 300);

    useEffect(() => {
        debounceHeight();
    }, [windowSize.height])

    return <BaseModal overlayStyles={overlayStyles} render={({close}) => (
        <S.Wrapper>
            <S.CloseIcon>
                <CloseModalIcon close={close}/>
            </S.CloseIcon>
            <S.Title>
                Корзина
            </S.Title>

            <S.Items>
                <CustomScrollbars height={finalHeight}>
                {products.map((item, i) => (
                    <CartItem key={i} item={item}/>
                ))}
                </CustomScrollbars>
            </S.Items>

            <S.Footer>
                <FlexBox alignItems={"center"} justifyContent={"space-between"}>
                    <S.Sum>Сумма заказа</S.Sum>
                    <Price newPrice={"308 ₴"}/>
                </FlexBox>
                <S.Button>
                    <ButtonOutline width={"100%"}>
                        Оформить заказ
                    </ButtonOutline>
                </S.Button>

            </S.Footer>
        </S.Wrapper>
    )}>
        {children}
    </BaseModal>
}