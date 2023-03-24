import { Link } from "react-router-dom";
import { useCategoriesStore, useCity, useSpot } from "~hooks";

export const CategoryIndex = () => {
  const categories = useCategoriesStore().items;
  const city = useCity();
  const spot = useSpot();

  return (
    <ul>
      {categories.map((category) => (
        <li>
          <Link
            to={
              "/" +
              city.slug +
              "/" +
              spot.slug +
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
