import * as S from "./styled";
import categoriesJSON from "../../common/mock/data/categories.json";
import {useState} from "react";
import Slider  from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {SvgIcon} from "../../components/svg/SvgIcon";
import {HorizontalArrowsSvg} from "../../components/svg/HorizontalArrowsSvg";
import {FlexBox} from "../../components/FlexBox";

const HorizontalMenu = () => {
    const [categories, ] = useState(categoriesJSON)
    const settings = {
        slidesToShow: 1,
        arrows: false,
        infinite: false,
        variableWidth: true,
        swipeToSlide: true
    }
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
                        categories.map((category) =>(
                            <S.Category key={category.id}>
                                {category.name}
                            </S.Category>
                        ))
                    }
                </Slider>

            </S.Categories>
        </nav>
    );
}

export {
    HorizontalMenu
}