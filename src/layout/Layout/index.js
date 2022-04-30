import {Header} from "../Header";
import {Container} from "../../components/Container";
import {Footer} from "../Footer";

export const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <main>
                <Container>
                    {children}
                </Container>
            </main>
            <Footer/>
        </>
    )
}