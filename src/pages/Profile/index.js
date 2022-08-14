import { CabinetLayout} from "../../layout/CabinetLayout";
import {useEffect} from "react";
import {inject, observer} from "mobx-react";

export const Profile = inject( 'AppStore')(observer((
    {
        AppStore
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    return (
        <CabinetLayout>

        </CabinetLayout>
    )
}))

