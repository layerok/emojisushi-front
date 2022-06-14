import {Layout} from "../../layout/Layout";
import {Heading} from "../../components/Heading";
import {CheckCircleSvg} from "../../components/svg/CheckCircleSvg";
import {SvgIcon} from "../../components/svg/SvgIcon";
import * as S from "./styled";
import styles from "./styles.module.css";
import {useEffect} from "react";
import {inject} from "mobx-react";
import {useTranslation} from "react-i18next";

export const ThankYouRaw = (
    {
        AppStore
    }
) => {
    useEffect(() => {
        AppStore.setLoading(false);
    }, [])
    const {t} = useTranslation();
    return (
        <Layout withSidebar={false}
                withBanner={false}
                mainProps={{
                    className: styles.thankYouLayoutMain
                }}
        >
            <S.Center>
                <Heading style={
                    {
                        marginBottom: "20px",
                        fontWeight: "bold"
                    }
                }>
                    {t('thankYou.title')}
                </Heading>
                <SvgIcon
                    color={"#FFE600"}
                    style={{width: "60px"}
                    }>
                    <CheckCircleSvg />
                </SvgIcon>
                <S.MediumText>
                    {t('thankYou.subtitle')}
                </S.MediumText>
                <S.Text>
                    {t('thankYou.text')}
                </S.Text>
            </S.Center>

        </Layout>
    )
}

export const ThankYou = inject('AppStore')(ThankYouRaw);