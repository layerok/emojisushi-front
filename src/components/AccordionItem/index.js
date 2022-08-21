import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {FlexBox} from "../FlexBox";
import {useState} from "react";
import {CaretUpSvg} from "../svg/CaretUpSvg";
import {Collapsible} from "../Collapsible";
import {Panel} from "./styled";


export const AccordionItem = () => {
    const renderContainer = ({Header, Panel}) => {
        return <S.Container>
            <Header/>
            <Panel/>
        </S.Container>
    }
    const renderHeader = ({
                              opened
                          }) => {
        return  <S.Header>
            <S.MutedText>№2131</S.MutedText>
            <S.MutedText>2022-08-07</S.MutedText>
            <S.Header.Status>Выполнен</S.Header.Status>
            <SvgIcon width={"20px"} style={{
                transformOrigin: "center",
                transform: opened ? "rotate(0deg)" : "rotate(180deg)"
            }}  color={"#939393"}>
                <CaretUpSvg/>
            </SvgIcon>
        </S.Header>
    }
    const renderPanel = ({opened}) => {
        return  <S.Panel>

            <S.Panel.Properties>
                <S.Panel.Properties.ExceptStatus>
                    <S.Panel.Properties.Property>
                        <S.MutedTextWrapper>
                            <S.MutedText>Способ оплаты</S.MutedText>
                        </S.MutedTextWrapper>
                        <S.OrderValue>Наличными</S.OrderValue>
                    </S.Panel.Properties.Property>
                    <S.Panel.Properties.Property>
                        <S.MutedTextWrapper>
                            <S.MutedText>Способ доставки</S.MutedText>
                        </S.MutedTextWrapper>
                        <S.OrderValue>Самовывоз</S.OrderValue>
                    </S.Panel.Properties.Property>
                    <S.Panel.Properties.Property>
                        <S.MutedTextWrapper>
                            <S.MutedText>Адрес доставки</S.MutedText>
                        </S.MutedTextWrapper>
                        <S.OrderValue>Одесса Пархоменка не 10</S.OrderValue>
                    </S.Panel.Properties.Property>
                </S.Panel.Properties.ExceptStatus>
                <S.Panel.Status>
                        <S.Panel.Status.Label>Статус заказа</S.Panel.Status.Label>
                        <S.Panel.Status.Value>Выполнен</S.Panel.Status.Value>
                </S.Panel.Status>
            </S.Panel.Properties>

            <S.Order>
                <div>
                    <S.OrderImg/>
                </div>
                <S.ProductContainer>
                    <S.ProductWrapper>
                        <S.OrderValue>Ролл Калифорния с угрём</S.OrderValue>

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
                        <div style={{marginLeft:"39px"}}>
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
                        <S.OrderValue>Ролл Калифорния с угрём</S.OrderValue>

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
                        <div style={{marginLeft:"39px"}}>
                            <S.ProductPrice>169 ₴</S.ProductPrice>
                        </div>
                    </S.ProductPriceWrapper>

                </S.ProductContainer>

            </S.Order>
            <FlexBox justifyContent={"flex-end"} style={{marginRight: "106px"}}>
                <S.ProductPrice>К оплате 300 ₴</S.ProductPrice>
            </FlexBox>
        </S.Panel>
    }

    return (
        <Collapsible renderPanel={({opened})=>{
            return  renderPanel({opened})
        }} renderHeader={({opened})=>{
            return  renderHeader({opened})
        }}
                     renderContainer={({Header,Panel})=>{
                         return renderContainer({Header,Panel});
                     }}
        />




    )
}