import {observer} from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useCitiesStore } from "~hooks/use-cities-store";
// todo: add index file for all hooks

export const SelectCity = observer(() => {
    const items = useCitiesStore().items;
    const navigate = useNavigate();

    return (
        <div>
            <h1>Оберіть місто</h1>
            <ul>
                {items.map(item => (
                  <li>
                      <a onClick={() => navigate('/' + item.slug)}>
                          {item.name}
                      </a>
                  </li>
                ))}
            </ul>
        </div>
    );
})

