import * as S from "./styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {HorizontalArrowsSvg} from "../../components/svg/HorizontalArrowsSvg";
import {FlexBox} from "../../components/FlexBox";
import {useParams} from "react-router-dom";

const HorizontalMenu = (
    {
        categories = []
    }
) => {

    const {categorySlug} = useParams();
    return (
        <nav>
            <S.Categories>
                <S.Hint>
                    <FlexBox alignItems={"center"}>
                        <SvgIcon width={"25px"} >
                            <HorizontalArrowsSvg/>
                        </SvgIcon>
                        <div style={{marginLeft: '10px'}}>Листай</div>
                    </FlexBox>
                </S.Hint>

                <S.HorizontalContainer>
                    {
                        categories.map((category) => {
                            const active = categorySlug === category.slug;
                            return (
                                <S.Category to={'/category/' + category.slug} isActive={active} key={category.id}>
                                    {category.name}
                                </S.Category>
                            )
                        })
                    }
                </S.HorizontalContainer>

            </S.Categories>
        </nav>
    );
}

export {
    HorizontalMenu
}