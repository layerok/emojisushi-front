import { observer} from "mobx-react";
import {useEffect} from "react";
import {CabinetLayout} from "../../layout/CabinetLayout";
import {AccordionItem} from "../../components/AccordionItem";
import {useAppStore} from "../../hooks/use-app-store";

export const MyOrders = observer(() => {
    const AppStore = useAppStore();
    useEffect(() => {
        AppStore.setLoading(false);
    }, [])


    return (

        <CabinetLayout title={"История заказов"}>


           <AccordionItem/>
        </CabinetLayout>

    );
})
