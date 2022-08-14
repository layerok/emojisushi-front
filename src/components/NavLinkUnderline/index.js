import * as S from "./styled";
import {useMatch, useResolvedPath} from "react-router-dom";

export function NavLinkUnderline({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <S.Link
            className={!!match ? 'active': undefined}
            to={to}
            {...props}
        >
            {children}
        </S.Link>
    );
}