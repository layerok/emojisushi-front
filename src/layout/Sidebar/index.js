import * as S from "./styled";
import {VerticalMenu} from "../VerticalMenu";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {HorizontalMenu} from "../HorizontalMenu";
import {FiltersButton} from "../../components/buttons/FiltersButton";
import {FlexBox} from "../../components/FlexBox";
import {SortOrderButton} from "../../components/buttons/SortOrderButton";
import {UnderVerticalMenu} from "../UnderVerticalMenu";
import {SortingPopover} from "../../components/popovers/SortingPopover";


export const Sidebar = () => {

    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';

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
                    <VerticalMenu/>
                    <UnderVerticalMenu/>
                </>
            ): (
                <HorizontalMenu/>
            )}

        </S.Sidebar>
    );
}