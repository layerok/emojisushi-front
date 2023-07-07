import * as S from "./styled";
import { Container, FlexBox } from "~components";
import { Left, Right } from "./components";
import { ICity, IGetCartRes, IUser } from "~api/types";

type THeaderProps = {
  loading?: boolean;
  cities?: ICity[];
  cart?: IGetCartRes;
  user?: IUser;
};

export const Header = ({ loading = false, cart, user }: THeaderProps) => {
  return (
    <S.Header>
      <Container>
        <FlexBox justifyContent={"space-between"} alignItems={"center"}>
          <Left loading={loading} />
          <Right user={user} cart={cart} loading={loading} />
        </FlexBox>
      </Container>
    </S.Header>
  );
};
