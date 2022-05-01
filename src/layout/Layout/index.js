import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";
import * as S from "./styled";

export const Layout = ({children}) => {
    return (
        <S.Layout>
            <Header/>
            <main>
                <Container>
                    {children}
                </Container>
            </main>
            <Footer/>
        </S.Layout>
    )
}