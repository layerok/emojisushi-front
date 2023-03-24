import * as S from "./styled";
import { ChangeEvent, ReactNode } from "react";
import { CheckSvg } from "../svg/CheckSvg";
import { SvgIcon } from "../svg/SvgIcon";
import { If } from "~components/If";

export const Checkbox = ({
  children,
  checked,
  name,
  onChange,
  error,
}: {
  children: ReactNode;
  checked: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => {
  return (
    <S.LabelCheck>
      <S.Checkbox type="checkbox" name={name} onChange={onChange} />
      <S.LabelCheckbox>
        <If condition={checked}>
          <SvgIcon width={"17px"} height={"12px"}>
            <CheckSvg />
          </SvgIcon>
        </If>
      </S.LabelCheckbox>
      <S.Text>{children}</S.Text>
      <If condition={!!error}>
        <S.Error>{error}</S.Error>
      </If>
    </S.LabelCheck>
  );
};
