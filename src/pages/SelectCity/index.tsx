import {observer} from "mobx-react";
import {useLoaderData, useNavigate} from "react-router-dom";
import {CitiesStore} from "~stores/cities.store";

export const SelectCity = observer(() => {
    const citiesStore = useLoaderData() as CitiesStore;
    const navigate = useNavigate();

    return (
        <div>
            <h1>Оберіть місто</h1>
            <ul>
                {citiesStore.items.map(item => (
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

