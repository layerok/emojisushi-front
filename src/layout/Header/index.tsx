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

export const Header = ({
  loading = false,
  cities = [],
  cart,
  user,
}: THeaderProps) => {
  return (
    <S.Header>
      <Container>
        <FlexBox justifyContent={"space-between"} alignItems={"center"}>
          <Left cities={cities} loading={loading} />
          <Right user={user} cart={cart} cities={cities} loading={loading} />
        </FlexBox>
      </Container>
    </S.Header>
  );
};
