import {observer} from "mobx-react";
import { useNavigate} from "react-router-dom";
import { useSpotsStore } from "~hooks/use-spots-store";

export const SelectSpot = observer(() => {
    const items = useSpotsStore().items;
    const navigate = useNavigate();
    return (
        <div>
            <h1>Оберіть заклад</h1>
            <ul>
                {items.map(item => (
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
