import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {FlexBox} from "../FlexBox";
import {useState} from "react";
import {CaretUpSvg} from "../svg/CaretUpSvg";


export const Collapsible = () => {


    const [opened, setOpened] = useState(false);


    return (
        <S.Collapsible>
            <S.OrderContainer style={{
                height: opened ? "315px" : "50px"
            }}>
                <S.OrderClosed onClick={ (e) => {
                    setOpened(!opened)
                }}>
                    <S.SmallText>№2131</S.SmallText>
                    <S.SmallText>2022-08-07</S.SmallText>
                    <S.OrderStatus>Выполнен</S.OrderStatus>
                    <SvgIcon width={"20px"} style={{
                        transformOrigin: "center",
                        transform: opened ? "rotate(0deg)" : "rotate(180deg)"
                    }}  color={"#939393"}>
                        <CaretUpSvg/>
                    </SvgIcon>
                </S.OrderClosed>
                {opened && (
                    <>
                        <S.HorizontalBar/>
                        <S.OrderOpen>
                            <S.OrderInfoWrapper>
                                <FlexBox flexDirection={"column"} justifyContent={"space-around"}>
                                    <S.SmallText>Способ оплаты</S.SmallText>
                                    <S.SmallText>Способ доставки</S.SmallText>
                                    <S.SmallText>Адрес доставки</S.SmallText>
                                </FlexBox>
                                <FlexBox flexDirection={"column"} style={{marginLeft: "45px"}}  justifyContent={"space-around"}>
                                    <S.OrderInfoText>Наличными</S.OrderInfoText>
                                    <S.OrderInfoText>Самовывоз</S.OrderInfoText>
                                    <S.OrderInfoText>Одесса Пархоменка не 10</S.OrderInfoText>
                                </FlexBox>
                                <S.OrderOpenStatus>
                                    <S.VerticalBar/>
                                    <FlexBox flexDirection={"column"} justifyContent={"center"}>
                                        <S.OrderInfoText>Статус заказа</S.OrderInfoText>
                                        <S.Completed>Выполнен</S.Completed>
                                    </FlexBox>
                                </S.OrderOpenStatus>
                            </S.OrderInfoWrapper>
                        </S.OrderOpen>
                        <S.HorizontalBar/>

                        <S.Order>
                            <div>
                                <S.OrderImg/>
                            </div>
                            <S.ProductContainer>
                                <S.ProductWrapper>
                                    <S.OrderInfoText>Ролл Калифорния с угрём</S.OrderInfoText>

                                    <S.ProductDescription>
                                        <S.OrderText>1 шт</S.OrderText>
                                        <S.VerticalStick/>
                                        <S.OrderText>220 г</S.OrderText>
                                        <S.VerticalStick/>
                                        <S.OrderText>120 Ккал</S.OrderText>
                                    </S.ProductDescription>
                                </S.ProductWrapper>

                                <S.ProductPriceWrapper>
                                    <FlexBox flexDirection={"column"}>
                                        <S.ProductPrice>169 ₴</S.ProductPrice>
                                        <S.ProductAmount>Кол-во: 1</S.ProductAmount>
                                    </FlexBox>
                                    <div style={{marginLeft:"39px", marginRight:"121px"}}>
                                        <S.ProductPrice>169 ₴</S.ProductPrice>
                                    </div>
                                </S.ProductPriceWrapper>

                            </S.ProductContainer>


                        </S.Order>

                        <S.Order>
                            <div>
                                <S.OrderImg/>
                            </div>
                            <S.ProductContainer>
                                <S.ProductWrapper>
                                    <S.OrderInfoText>Ролл Калифорния с угрём</S.OrderInfoText>

                                    <S.ProductDescription>
                                        <S.OrderText>1 шт</S.OrderText>
                                        <S.VerticalStick/>
                                        <S.OrderText>220 г</S.OrderText>
                                        <S.VerticalStick/>
                                        <S.OrderText>120 Ккал</S.OrderText>
                                    </S.ProductDescription>
                                </S.ProductWrapper>

                                <S.ProductPriceWrapper>
                                    <FlexBox flexDirection={"column"}>
                                        <S.ProductPrice>169 ₴</S.ProductPrice>
                                        <S.ProductAmount>Кол-во: 1</S.ProductAmount>
                                    </FlexBox>
                                    <div style={{marginLeft:"39px", marginRight:"121px"}}>
                                        <S.ProductPrice>169 ₴</S.ProductPrice>
                                    </div>
                                </S.ProductPriceWrapper>

                            </S.ProductContainer>

                        </S.Order>
                        <FlexBox justifyContent={"flex-end"} style={{marginRight: "106px"}}>
                            <S.ProductPrice>К оплате 300 ₴</S.ProductPrice>
                        </FlexBox>
                    </>

                )}

            </S.OrderContainer>

        </S.Collapsible>

    )
}