import {inject, observer} from "mobx-react";
import {CabinetLayout} from "../../layout/CabinetLayout";
import {useEffect} from "react";
import * as S from "./styled";
import {Input} from "../../components/Input";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {CloseSvg} from "../../components/svg/CloseSvg";
import {HeartSvg} from "../../components/svg/HeartSvg";
import {ButtonOutline} from "../../components/buttons/Button";

export const SavedAddresses = inject( 'AppStore')(observer((
    {
        AppStore
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    return (
        <CabinetLayout title={"Сохраненные адреса"}>

            <S.AddressWrapper>
                <Input value={"Литвиненко-Вольгемут 1Г, Одесса"} width={"350px"}/>
                <SvgIcon width={"25px"} hoverColor={"#FFE600"} style={{marginLeft:"10px"}}>
                    <HeartSvg/>
                </SvgIcon>
                <SvgIcon width={"25px"} hoverColor={"#CD3838;"} style={{marginLeft:"10px"}}>
                    <CloseSvg/>
                </SvgIcon>
            </S.AddressWrapper>


            <S.AddressWrapper>
                <Input value={"Литвиненко-Вольгемут 1Г, Одесса"} width={"350px"}/>
                <SvgIcon width={"25px"} hoverColor={"#FFE600"} style={{marginLeft:"10px"}}>
                    <HeartSvg/>
                </SvgIcon>
                <SvgIcon width={"25px"} hoverColor={"#CD3838;"} style={{marginLeft:"10px"}}>
                    <CloseSvg/>
                </SvgIcon>
            </S.AddressWrapper>
            <S.ButtonWrapper>
                <ButtonOutline width={""}>Добавить адрес</ButtonOutline>
            </S.ButtonWrapper>
        </CabinetLayout>

    )


}))