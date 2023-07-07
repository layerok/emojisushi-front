import * as S from "./styled";
import { Container, FlexBox } from "~components";
import { Left, Right } from "./components";
import { IGetCartRes, ISpot, IUser } from "~api/types";

type THeaderProps = {
  loading?: boolean;
  cart?: IGetCartRes;
  user?: IUser;
  spots?: ISpot[];
};

export const Header = ({
  loading = false,
  cart,
  user,
  spots,
}: THeaderProps) => {
  return (
    <S.Header>
      <Container>
        <FlexBox justifyContent={"space-between"} alignItems={"center"}>
          <Left spots={spots} loading={loading} />
          <Right user={user} cart={cart} loading={loading} />
        </FlexBox>
      </Container>
    </S.Header>
  );
};
