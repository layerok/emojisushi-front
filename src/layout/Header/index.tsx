import * as S from "./styled";
import { Container, FlexBox } from "~components";
import { Left, Right } from "./components";
import { ICity, IGetCartRes, IUser } from "~api/types";

type THeaderProps = {
  loading?: boolean;
  cart?: IGetCartRes;
  user?: IUser;
  cities?: ICity[];
};

export const Header = ({
  loading = false,
  cart,
  user,
  cities,
}: THeaderProps) => {
  return (
    <S.Header>
      <Container>
        <FlexBox justifyContent={"space-between"} alignItems={"center"}>
          <Left cities={cities} loading={loading} />
          <Right user={user} cart={cart} loading={loading} cities={cities} />
        </FlexBox>
      </Container>
    </S.Header>
  );
};
