import { observer} from "mobx-react";
import {useEffect} from "react";
import {CabinetLayout} from "~layout/CabinetLayout";
import {AccordionItem} from "~components/AccordionItem";
import {useAppStore} from "~hooks/use-app-store";
import {useTranslation} from "react-i18next";

export const MyOrders = observer(() => {
    const AppStore = useAppStore();
    const {t} = useTranslation();
    useEffect(() => {
        AppStore.setLoading(false);
    }, [])


    return (

        <CabinetLayout title={t('account.orders.title')}>


           <AccordionItem/>
        </CabinetLayout>

    );
})
