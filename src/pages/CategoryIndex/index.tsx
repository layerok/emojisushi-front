import { Link } from "react-router-dom";
import { useCategoriesStore, useCity, useSpot } from "~hooks";

export const CategoryIndex = () => {
  const categoriesStore = useCategoriesStore();
  const city = useCity();
  const selectedSpot = useSpot();

  return (
    <ul>
      {categoriesStore.publishedCategories
        .filter((category) => {
          const hidden = category.hide_categories_in_spot.find(
            (spot) => spot.id === selectedSpot.id
          );
          return !hidden;
        })
        .map((category) => (
          <li>
            <Link
              to={
                "/" +
                city.slug +
                "/" +
                selectedSpot.slug +
                "/" +
                "category" +
                "/" +
                category.slug
              }
            >
              {category.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export const Component = CategoryIndex;

Object.assign(CategoryIndex, {
  displayName: "LazyCategoryIndex",
});
