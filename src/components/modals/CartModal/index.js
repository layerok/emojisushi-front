import {BaseModal} from "../BaseModal";
import * as S from "./styled";
import {LightCounter} from "../../Counter";
import {FlexBox} from "../../FlexBox";
import {Price} from "../../Price";
import {CloseModalIcon} from "../CloseModalIcon";
import {CloseIcon} from "../../CloseIcon";
import {ButtonOutline} from "../../buttons/Button";
import {CustomScrollbars} from "../../../layout/CustomScrollbar";
import {useWindowSize} from "react-use";
import {useEffect, useState} from "react";
import {useDebounce} from "../../../common/hooks/useDebounce";
import {useBreakpoint} from "../../../common/hooks/useBreakpoint";
import {ConfirmActionPopover} from "../../popovers/ConfirmActionPopover";
import { useNavigate } from "react-router-dom";
import {getNameWithMods, getProductMainImage, getProductNewPrice, getProductOldPrice} from "../../../utils/utils";
import {inject, observer} from "mobx-react";
import {Loader} from "../../Loader";
import {useTranslation} from "react-i18next";
import {SvgIcon} from "../../svg/SvgIcon";
import {LogoSvg} from "../../svg/LogoSvg";
import {SushiSvg} from "../../svg/SushiSvg";
import {cartService} from "../../../services/cart.service";

const CartItem = inject('CartStore')(observer((
    {
        item,
        CartStore
    }
) => {
    const {product} = item;
    const img = getProductMainImage(product);
    const newPrice = getProductNewPrice(product, item.variant);
    const oldPrice = getProductOldPrice(product, item.variant)
    const nameWithMods = getNameWithMods(item);

    const handleAdd = (product_id, variant_id) => {
        return (quantity) => {
            cartService.addProduct({
                product_id,
                quantity,
                variant_id
            })
        }
    }
    const {t} = useTranslation();
    return (<S.Item>
        <S.Item.RemoveIcon>
            <ConfirmActionPopover onConfirm={({close}) => {
                cartService.removeCartProduct(item.id);
                close();
            }} onCancel={({close}) => {
                close();
            }} text={t('cartModal.remove')}>
                <CloseIcon color={"#4A4A4A"}/>
            </ConfirmActionPopover>
        </S.Item.RemoveIcon>
        <S.Item.Img src={img}>
            {!img && (
                <SvgIcon color={"white"} width={"80%"} style={{opacity: 0.05}}>
                    <LogoSvg/>
                </SvgIcon>
            )}
        </S.Item.Img>
        <S.Item.Info>
            <S.Item.Name title={nameWithMods}>
                {nameWithMods}
            </S.Item.Name>
            <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
                <S.Item.Counter>
                    <LightCounter handleIncrement={() => {
                        handleAdd(item.product_id, item.variant_id)(1);
                    }} handleDecrement={() => {
                        handleAdd(item.product_id, item.variant_id)(-1);
                    }} count={item.quantity}/>
                </S.Item.Counter>
                <Price newPrice={newPrice} oldPrice={oldPrice}/>
            </FlexBox>
        </S.Item.Info>
    </S.Item>)
}))


export const CartModal = inject('CartStore')(observer((
    {
        children,
        CartStore: {
            items,
            total,
            loading,
        }
    }) => {
    const navigate = useNavigate();
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
        zIndex: 999999
    };

    // max cart items wrapper height is 500px and min is 300px
    // 252px is sum of heights another element in cart modal
    const finalHeight = Math.max(Math.min(height - 252, 500), 300);

    useEffect(() => {
        debounceHeight();
    }, [windowSize.height])
    const {t} = useTranslation();
    return <BaseModal overlayStyles={overlayStyles} render={({close}) => (
        <S.Wrapper>
            <Loader loading={loading}/>
            <S.CloseIcon>
                <CloseModalIcon close={close}/>
            </S.CloseIcon>


            <S.EmptyCartImgContainer>
                {items.length === 0 && <SushiSvg/> }
                <S.Title>
                    {items.length === 0 && t('cartModal.empty') }
                </S.Title>
            </S.EmptyCartImgContainer>

            <S.Items>
                <CustomScrollbars height={finalHeight}>
                {items.map((item, i) => (
                    <CartItem key={i} item={item}/>
                ))}
                </CustomScrollbars>
            </S.Items>

            { items.length !== 0 && (
                <S.Footer>
                    <FlexBox alignItems={"center"} justifyContent={"space-between"}>
                        <S.Sum>{t('cartModal.sum_order')}</S.Sum>
                        <Price newPrice={total}/>
                    </FlexBox>
                    <S.Button>
                        <ButtonOutline disabled={items.length === 0} onClick={() => {
                            navigate('/checkout');
                        }} width={"100%"}>
                            {t('cartModal.checkout')}
                        </ButtonOutline>
                    </S.Button>

                </S.Footer>
            )}
        </S.Wrapper>
    )}>
        {children}
    </BaseModal>
}))