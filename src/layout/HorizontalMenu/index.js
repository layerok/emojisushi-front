import * as S from "./styled";
import categoriesJSON from "../../common/mock/data/categories.json";
import {useState} from "react";
import Slider  from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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