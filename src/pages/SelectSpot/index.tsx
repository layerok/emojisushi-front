import {observer} from "mobx-react";
import {useSpotsStore} from "~hooks/use-spots-store";
import {useNavigate} from "react-router-dom";

export const SelectSpot = observer(() => {
    const spotsStore = useSpotsStore();
    const navigate = useNavigate();
    return (
        <div>
            <h1>Оберіть заклад</h1>
            <ul>
                {spotsStore.items.map(item => (
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
