import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import {CabinetLayout} from "../../layout/CabinetLayout";
import * as S from "./styled";
import {Collapsible} from "../../components/Collapsible";
import {AccordionItem} from "../../components/AccordionItem";

export const MyOrders = inject( 'AppStore')(observer((
    {
        AppStore,
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])


    return (

        <CabinetLayout title={"История заказов"}>


           <AccordionItem/>
        </CabinetLayout>

    );
}))
