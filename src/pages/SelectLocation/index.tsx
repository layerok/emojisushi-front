import {observer} from "mobx-react";
import { Link, useNavigate } from "react-router-dom";
import { useCitiesStore } from "~hooks/use-cities-store";
// todo: add index file for all hooks

export const SelectLocation = observer(() => {
    const items = useCitiesStore().items;
    const navigate = useNavigate();

    return (
      <div>
        <h1>Оберіть місто</h1>
        <ul>
          {items.map((city) =>
            city.spots.map((spot) => (
              <li key={city.id + "-" + spot.id}>
                <Link to={"/" + city.slug + "/" + spot.slug}>
                  {city.name}, {spot.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    );
})

