import * as S from "./styled";
import { Popover } from "~components/popovers/Popover";
import { Button } from "~common/ui-components/Button/Button";
import { FlexBox } from "~components/FlexBox";
import { useTranslation } from "react-i18next";
import { PropsWithChildren } from "react";

type ConfirmActionPopover = PropsWithChildren<{
  text: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

export const ConfirmActionPopover = (props: ConfirmActionPopover) => {
  const {
    text,
    open = false,
    children,
    onConfirm = () => {},
    onCancel = () => {},
    onOpenChange = () => {},
  } = props;

  const { t } = useTranslation();

  const handleConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  const handleCancel = () => {
    onOpenChange(false);
    onCancel();
  };

  const renderContent = () => (
    <S.Wrapper>
      {text}
      <FlexBox style={{ marginTop: "20px" }} justifyContent={"space-between"}>
        <Button
          onClick={handleConfirm}
          style={{
            width: 162,
          }}
        >
          {t("confirmAction.yes")}
        </Button>
        <Button filled onClick={handleCancel} style={{ width: 162 }}>
          {t("confirmAction.no")}
        </Button>
      </FlexBox>
    </S.Wrapper>
  );

  return (
    <Popover open={open} onOpenChange={onOpenChange} render={renderContent}>
      {children}
    </Popover>
  );
};
