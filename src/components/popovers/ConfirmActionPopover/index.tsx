import * as S from "./styled";
import { Popover } from "../Popover";
import { Button } from "~common/ui-components/Button/Button";
import { FlexBox } from "../../FlexBox";
import { useTranslation } from "react-i18next";

export const ConfirmActionPopover = ({
  text,
  onConfirm,
  initiallyOpen = false,
  onCancel,
  children,
}) => {
  const { t } = useTranslation();
  return (
    <Popover
      open={initiallyOpen}
      render={({ close }) => (
        <S.Wrapper>
          {text}
          <FlexBox
            style={{ marginTop: "20px" }}
            justifyContent={"space-between"}
          >
            <Button
              onClick={() => onConfirm({ close })}
              style={{
                width: 162,
              }}
            >
              {t("confirmAction.yes")}
            </Button>
            <Button
              filled
              onClick={() => onCancel({ close })}
              style={{ width: 162 }}
            >
              {t("confirmAction.no")}
            </Button>
          </FlexBox>
        </S.Wrapper>
      )}
    >
      {children}
    </Popover>
  );
};
