import { observer} from "mobx-react";
import {useEffect} from "react";
import {CabinetLayout} from "~layout/CabinetLayout";
import {AccordionItem} from "~components/AccordionItem";
import {useAppStore} from "~hooks/use-app-store";
import {useTranslation} from "react-i18next";
import {useAuthStore} from "~hooks/use-auth-store";

export const MyOrders = observer(() => {
    const AppStore = useAppStore();
    const {t} = useTranslation();
    const AuthStore = useAuthStore();
    const user = AuthStore.user;
    const customer = user.customer;
    useEffect(() => {
        AppStore.setLoading(false);
    }, [])


    return (

        <CabinetLayout title={t('account.orders.title')}>
            {customer.hasOrders ? (
              customer.orders.map((order, index) => (
                    <div style={{
                        marginTop: index ? '16px': 0
                    }}>
                        <AccordionItem key={order.id} order={order}/>
                    </div>

                  ))
            ): (
              <p>{t('account.orders.noOrders')}</p>
            )}


        </CabinetLayout>

    );
})
