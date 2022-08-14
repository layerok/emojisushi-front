import {Layout} from "../../layout/Layout";
import {Cabinet} from "../../layout/Cabinet";
import {useEffect} from "react";
import {inject, observer} from "mobx-react";


export const Profile = inject( 'AppStore')(observer(({
                            AppStore
                        }) => {

    useEffect(() => {
            AppStore.setLoading(false);
    }, [])

    return (
            <Layout withSidebar={false}
                    withBanner={false}
            >
                <Cabinet>

                </Cabinet>

            </Layout>

    )
}))

