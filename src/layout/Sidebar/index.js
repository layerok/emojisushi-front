import * as S from "./styled";
import {VerticalMenu} from "../VerticalMenu";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {HorizontalMenu} from "../HorizontalMenu";
import {FiltersButton} from "../../components/buttons/FiltersButton";
import {FlexBox} from "../../components/FlexBox";
import {UnderVerticalMenu} from "../UnderVerticalMenu";
import {SortingPopover} from "../../components/popovers/SortingPopover";
import {inject, observer} from "mobx-react";
import {useEffect} from "react";


export const SidebarRaw = (
    {
        MenuStore: {
            categories,
            fetchCategories
        }
    }
) => {

    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <S.Sidebar>
            <FlexBox
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={isMobile ? 'column': 'row'}
            >
                <S.SearchInput/>
                {breakpoint !== 'pc' && (
                    <FlexBox justifyContent={isMobile ? 'space-between': 'flex-end'} style={{
                        width: "100%"
                    }}>
                        <FiltersButton text={"Фильтры"} />
                        <div style={{
                            marginLeft: "30px"
                        }}>
                            <SortingPopover/>
                        </div>
                    </FlexBox>
                )}
            </FlexBox>
            {breakpoint === 'pc' ? (
                <>
                    <VerticalMenu categories={categories}/>
                    <UnderVerticalMenu/>
                </>
            ): (
                <HorizontalMenu categories={categories}/>
            )}

        </S.Sidebar>
    );
}

export const Sidebar = inject('MenuStore')(observer(SidebarRaw));