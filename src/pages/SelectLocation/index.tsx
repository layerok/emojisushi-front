import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useCitiesStore } from "~hooks/use-cities-store";

export const SelectLocation = observer(() => {
  const items = useCitiesStore().items;
  return (
    <div>
      <h1>Оберіть заклад</h1>
      <ul>
        {items.map((city) =>
          city.spots.map((spot) => (
            <li key={city.id + "-" + spot.id}>
              <Link to={"/" + city.slug + "/" + spot.slug + "/category"}>
                {city.name}, {spot.name}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
});

export const Component = SelectLocation;

Object.assign(Component, {
  displayName: "LazySelectLocation",
});
