import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {FlexBox} from "../FlexBox";
import {CaretUpSvg} from "../svg/CaretUpSvg";
import {Collapsible} from "../Collapsible";
import {useBreakpoint} from "~common/hooks/useBreakpoint";
const ProductImage = require("~assets/img/products/2.png");


export const AccordionItem = () => {

    const breakpoint = useBreakpoint();
    const isPc = breakpoint === 'pc';
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
            <S.Header.MobileTextContainer>
                <S.MutedText>№2131</S.MutedText>
                <S.Pan.Props.Prop.Value style={{marginTop: !isPc ? "5px" : "0"}}>2022-08-07</S.Pan.Props.Prop.Value>
            </S.Header.MobileTextContainer>
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
        return  <S.Pan>

            <S.Pan.Props>
                <S.Pan.Props.ExceptStatus>
                    <S.Pan.Props.Prop>
                        <S.Pan.Props.Prop.Label>
                            <S.MutedText>Способ оплаты</S.MutedText>
                        </S.Pan.Props.Prop.Label>
                        <S.Pan.Props.Prop.Value>Наличными</S.Pan.Props.Prop.Value>
                    </S.Pan.Props.Prop>
                    <S.Pan.Props.Prop>
                        <S.Pan.Props.Prop.Label>
                            <S.MutedText>Способ доставки</S.MutedText>
                        </S.Pan.Props.Prop.Label>
                        <S.Pan.Props.Prop.Value>Самовывоз</S.Pan.Props.Prop.Value>
                    </S.Pan.Props.Prop>
                    <S.Pan.Props.Prop>
                        <S.Pan.Props.Prop.Label>
                            <S.MutedText>Адрес доставки</S.MutedText>
                        </S.Pan.Props.Prop.Label>
                            <S.Pan.Props.Prop.Value>Одесса Пархоменка не 10</S.Pan.Props.Prop.Value>
                    </S.Pan.Props.Prop>
                </S.Pan.Props.ExceptStatus>
                <S.Pan.Status>
                    <S.Pan.Status.Label>Статус заказа</S.Pan.Status.Label>
                    <S.Pan.Status.Value>Выполнен</S.Pan.Status.Value>
                </S.Pan.Status>
            </S.Pan.Props>

            <div>
                <S.Pan.Prod>
                    <S.Pan.Prod.Img src={ProductImage}/>
                    <S.Pan.Prod.Props>
                        <S.Pan.Prod.Sect1>
                            <S.Pan.Prod.Name>Ролл Калифорния с угрём</S.Pan.Prod.Name>

                            <S.Pan.Prod.Description>
                                <S.Pan.Prod.Prop>1 шт</S.Pan.Prod.Prop>
                                <S.Pan.VerticalStick/>
                                <S.Pan.Prod.Prop>220 г</S.Pan.Prod.Prop>
                                <S.Pan.VerticalStick/>
                                <S.Pan.Prod.Prop>120 Ккал</S.Pan.Prod.Prop>
                            </S.Pan.Prod.Description>
                        </S.Pan.Prod.Sect1>

                        <S.Pan.Prod.Sect2>
                            <FlexBox flexDirection={"column"}>
                                <S.Pan.Prod.Price>169 ₴</S.Pan.Prod.Price>
                                <S.Pan.Prod.Amount>Кол-во: 1</S.Pan.Prod.Amount>
                            </FlexBox>
                            <div style={{marginLeft:"39px"}}>
                                <S.Pan.Prod.Price>169 ₴</S.Pan.Prod.Price>
                            </div>
                        </S.Pan.Prod.Sect2>

                    </S.Pan.Prod.Props>


                </S.Pan.Prod>

                <S.Pan.Prod>
                    <S.Pan.Prod.Img src={ProductImage}/>
                    <S.Pan.Prod.Props>
                        <S.Pan.Prod.Sect1>
                            <S.Pan.Prod.Name>Ролл Калифорния с угрём</S.Pan.Prod.Name>

                            <S.Pan.Prod.Description>
                                <S.Pan.Prod.Prop>1 шт</S.Pan.Prod.Prop>
                                <S.Pan.VerticalStick/>
                                <S.Pan.Prod.Prop>220 г</S.Pan.Prod.Prop>
                                <S.Pan.VerticalStick/>
                                <S.Pan.Prod.Prop>120 Ккал</S.Pan.Prod.Prop>
                            </S.Pan.Prod.Description>
                        </S.Pan.Prod.Sect1>

                        <S.Pan.Prod.Sect2>
                            <FlexBox flexDirection={"column"}>
                                <S.Pan.Prod.Price>169 ₴</S.Pan.Prod.Price>
                                <S.Pan.Prod.Amount>Кол-во: 1</S.Pan.Prod.Amount>
                            </FlexBox>
                            <div style={{marginLeft:"39px"}}>
                                <S.Pan.Prod.Price>169 ₴</S.Pan.Prod.Price>
                            </div>
                        </S.Pan.Prod.Sect2>

                    </S.Pan.Prod.Props>

                </S.Pan.Prod>
            </div>

            <S.Pan.Prod.TotalPrice>
                <S.Pan.Prod.Price>К оплате: 300 ₴</S.Pan.Prod.Price>
            </S.Pan.Prod.TotalPrice>
        </S.Pan>
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
                     headerTag={"p"}
        />




    )
}
