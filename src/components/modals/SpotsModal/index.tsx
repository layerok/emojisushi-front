import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {Modal} from "../Modal";
import {observer} from "mobx-react";
import {MapPinSvg} from "../../svg/MapPinSvg";
import {useTranslation} from "react-i18next";
import {useSpotsStore} from "../../../hooks/use-spots-store";
import {transaction} from "mobx";

export const SpotsModalRaw = (
  {
    open = false,
  }
) => {
  const SpotsStore = useSpotsStore();

  const records = SpotsStore.items || [];
  const selectedIndex = SpotsStore.getSelectedIndex;
  const {t} = useTranslation();

  return <Modal open={open} render={({close}) => (
    <S.Wrapper>
      <S.FilterMagnifier>
        <S.Text>
          {t('spotsModal.title')}
        </S.Text>
        <SvgIcon width={"25px"} style={{marginLeft: "13px"}}>
          <MapPinSvg/>
        </SvgIcon>
      </S.FilterMagnifier>
      <S.Content>
        {records.map((item, i) => {
          return <S.Item key={item.id}
                         onClick={() => {
                           transaction(() => {
                             SpotsStore.changeSpot(item);
                             SpotsStore.setUserSelectedSpot(true);
                           })

                           close();
                         }}
                         selected={i === selectedIndex}>
            {item.name}
          </S.Item>
        } )}
      </S.Content>

    </S.Wrapper>
  )}>
    <div></div>
  </Modal>;
}

export const SpotsModal = observer(SpotsModalRaw);
