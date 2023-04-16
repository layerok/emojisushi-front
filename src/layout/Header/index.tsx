import * as S from "./styled";
import { Container, FlexBox } from "~components";
import { Left, Right } from "./components";

type THeaderProps = {
  loading?: boolean;
};

export const Header = ({ loading = false }: THeaderProps) => {
  return (
    <S.Header>
      <Container>
        <FlexBox justifyContent={"space-between"} alignItems={"center"}>
          <Left loading={loading} />
          <Right loading={loading} />
        </FlexBox>
      </Container>
    </S.Header>
  );
};
