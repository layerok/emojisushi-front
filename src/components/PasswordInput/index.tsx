import * as S from "./styled";
import { SvgIcon } from "../SvgIcon";
import { EyeSvg } from "../svg/EyeSvg";
import { forwardRef, useState } from "react";
import { ClosedEyeSvg } from "../svg/ClosedEyeSvg";
import { IInputComponentProps, Input } from "../Input";

type IProps = IInputComponentProps & {
  name: string;
  hidden?: boolean;
};

export const PasswordInput = forwardRef<HTMLInputElement, IProps>(
  ({ hidden: hiddenPassed = true, name, ...rest }, ref) => {
    const [hidden, setHidden] = useState(hiddenPassed);

    return (
      <S.Wrapper>
        <Input
          name={name}
          type={hidden ? "password" : "text"}
          {...rest}
          ref={ref}
        />
        <S.Eye
          onClick={() => {
            setHidden(!hidden);
          }}
        >
          <SvgIcon width="20px">
            {hidden && <ClosedEyeSvg />}
            {!hidden && <EyeSvg />}
          </SvgIcon>
        </S.Eye>
      </S.Wrapper>
    );
  }
);
