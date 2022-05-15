import {
    useMatch,
    useResolvedPath,
} from "react-router-dom";

import * as S from "./styled";

export function NavLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <S.Link
                active={!!match}
                to={to}
                {...props}
            >
                {children}
        </S.Link>
    );
}