import * as S from "./styled";
import Slider  from "react-slick";
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
    const settings = {
        slidesToShow: 1,
        arrows: false,
        infinite: false,
        variableWidth: true,
        swipeToSlide: true
    }
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

                <Slider {...settings}>
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
                </Slider>

            </S.Categories>
        </nav>
    );
}

export {
    HorizontalMenu
}