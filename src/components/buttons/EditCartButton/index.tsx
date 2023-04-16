import { SvgIcon } from "../../SvgIcon";
import { PencilSvg } from "../../svg/PencilSvg";
import { UIButton } from "../UIButton";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

export const EditCartButton = forwardRef<HTMLDivElement>((props, ref) => {
  const { t } = useTranslation();
  return (
    <UIButton text={t("editBtn.edit_order")} ref={ref}>
      <SvgIcon color={"white"} width={"25px"}>
        <PencilSvg />
      </SvgIcon>
    </UIButton>
  );
});
