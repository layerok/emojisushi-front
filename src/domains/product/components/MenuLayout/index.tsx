import { MobSidebar, Sidebar, Container } from "~components";
import * as S from "./styled";
import { IGetCategoriesRes } from "~api/types";
import { ReactNode } from "react";

// todo: it looks like RR route layout
export const MenuLayout = ({
  children,
  categories,
}: {
  categories: IGetCategoriesRes;
  children: ReactNode;
}) => {
  return (
    <Container>
      <S.Container>
        {!categories ? (
          <>
            <Sidebar loading />
            <MobSidebar loading />
          </>
        ) : (
          <>
            <Sidebar categories={categories.data} />
            <MobSidebar categories={categories.data} />
          </>
        )}
        {children}
      </S.Container>
    </Container>
  );
};
