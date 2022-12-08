import {makeAutoObservable} from "mobx";

class Categories {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];

    setName = (name) => {
        this.name = name;
    }

    setItems = (categories) => {
        this.items = categories;
    }
}

const CategoriesStore = new Categories();

export {
    CategoriesStore
}