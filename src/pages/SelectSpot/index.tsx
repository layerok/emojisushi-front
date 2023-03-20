import {observer} from "mobx-react";
import { useNavigate} from "react-router-dom";
import { useCity } from "~hooks/use-city";

export const SelectSpot = observer(() => {
    const city = useCity();
    const navigate = useNavigate();
    return (
        <div>
            <h1>Оберіть заклад</h1>
            <ul>
                {city.spots.map(item => (
                  <li>
                      <a onClick={() => navigate(item.slug)}>
                          {item.name}
                      </a>
                  </li>
                ))}
            </ul>
        </div>
    );
})
