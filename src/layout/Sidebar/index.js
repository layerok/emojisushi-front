import * as S from "./styled";
import {VerticalMenu} from "../VerticalMenu";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {HorizontalMenu} from "../HorizontalMenu";


export const Sidebar = () => {

    const breakpoint = useBreakpoint();

    return (
        <S.Sidebar>
            <div>
                <S.SearchInput/>
            </div>
            {breakpoint === 'pc' ? (
                <VerticalMenu/>
            ): (
                <HorizontalMenu/>
            )}

        </S.Sidebar>
    );
}