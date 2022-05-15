import productSrc1 from "../../../assets/img/products/1.png";
import productSrc2 from "../../../assets/img/products/2.png";
import productSrc3 from "../../../assets/img/products/3.png";
import productSrc4 from "../../../assets/img/products/4.png";
import productSrc5 from "../../../assets/img/products/5.png";
import productSrc6 from "../../../assets/img/products/6.png";
import productSrc7 from "../../../assets/img/products/7.png";
import productSrc8 from "../../../assets/img/products/8.png";
import productSrc9 from "../../../assets/img/products/9.png";

export const products = [
    {
        id: 1,
        name: "Ролл овощной",
        weight: "225г",
        old_price: "90 ₴",
        new_price: "79 ₴",
        is_favorite: true,
        count: 0,
        pending: false,
        image: productSrc1,
        ingredients: [
            "Тунец",
            "Огурец",
            "Авокадо",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 2,
        name: "Ролл Калифорния с тунцом",
        weight: "240г",
        new_price: "139 ₴",
        is_favorite: false,
        count: 0,
        pending: true,
        image: productSrc2,
        ingredients: [
            "Тунец",
            "Авокадо",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 3,
        name: "Ролл Калифорния с угрём",
        weight: "220г",
        new_price: "169 ₴",
        is_favorite: false,
        count: 1,
        pending: false,
        image: productSrc3,
        ingredients: [
            "Тунец",
            "Огурец",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 4,
        name: "Ролл Тагараши",
        weight: "220г",
        new_price: "139 ₴",
        is_favorite: false,
        count: 0,
        pending: false,
        image: productSrc4,
        ingredients: [
            "Тунец",
            "Огурец",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 5,
        name: "Ролл Филадельфия в икре",
        weight: "230г",
        new_price: "139 ₴",
        is_favorite: false,
        count: 1,
        pending: false,
        image: productSrc5,
        ingredients: [
            "Тунец",
            "Огурец",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 6,
        name: "Ролл Филадельфия в тунце",
        weight: "252г",
        new_price: "159 ₴",
        is_favorite: false,
        count: 0,
        pending: false,
        image: productSrc6,
        ingredients: [
            "Тунец",
            "Огурец",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 7,
        name: "Ролл Цезарь",
        weight: "220г",
        new_price: "105 ₴",
        is_favorite: false,
        count: 0,
        pending: false,
        image: productSrc7,
        ingredients: [
            "Тунец",
            "Огурец",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 8,
        name: "Ролл Калифорния с угрём",
        weight: "220г",
        new_price: "105 ₴",
        is_favorite: false,
        count: 0,
        pending: false,
        image: productSrc8,
        ingredients: [
            "Тунец",
            "Огурец",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    },
    {
        id: 9,
        name: "Ролл Футомаки овощной",
        weight: "220г",
        new_price: "89 ₴",
        is_favorite: false,
        count: 0,
        pending: false,
        image: productSrc9,
        ingredients: [
            "Тунец",
            "Огурец",
            "Соус спайси",
            "Фурикаке (Смесь кунжута, перца)",
        ]
    }
]