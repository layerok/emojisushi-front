import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {CabinetLayout} from "../../layout/CabinetLayout";
import * as S from "./styled";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {CaretDownSvg} from "../../components/svg/CaretDownSvg";
import {FlexBox} from "../../components/FlexBox";

export const MyOrders = inject( 'AppStore')(observer((
    {
        AppStore,
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])


    return (

        <CabinetLayout>
            <S.Heading>История заказов</S.Heading>

            <S.Order>
                <S.OrderClosed>
                    <S.OrderText>№2131</S.OrderText>
                    <S.OrderInfoText>2022-08-07</S.OrderInfoText>
                    <S.OrderStatus>Выполнен</S.OrderStatus>
                    <SvgIcon width={"20px"}>
                        <CaretDownSvg/>
                    </SvgIcon>
                </S.OrderClosed>
                <S.HorizontalBar/>
                <S.OrderOpen>
                    <S.OrderInfoWrapper>
                        <FlexBox flexDirection={"column"}>
                            <S.OrderText>Способ оплаты</S.OrderText>
                            <S.OrderText>Способ доставки</S.OrderText>
                            <S.OrderText>Адрес доставки</S.OrderText>
                        </FlexBox>
                        <S.Wrapper>
                            <S.OrderInfoText>Наличными</S.OrderInfoText>
                            <S.OrderInfoText>Самовывоз</S.OrderInfoText>
                        </S.Wrapper>
                        <S.OrderOpenStatus>
                                <S.VerticalBar/>
                            <FlexBox flexDirection={"column"}>
                                <S.OrderText>Статус заказа</S.OrderText>
                                <S.Completed>Выполнен</S.Completed>
                            </FlexBox>
                        </S.OrderOpenStatus>
                    </S.OrderInfoWrapper>
                    <S.HorizontalBar/>
                </S.OrderOpen>

            </S.Order>

        </CabinetLayout>

    );
}))
