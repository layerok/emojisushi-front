import {Header} from "../Header";
import {Container} from "../../components/Container";

export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <main>
                <Container>
                    {children}
                </Container>
            </main>
        </>
    )
}