import { MobSidebar, Sidebar, Container } from "~components";
import * as S from "./styled";
import { useQuery } from "@tanstack/react-query";
import { citiesQuery } from "~queries/cities.query";
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
  const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);

  return (
    <Container>
      <S.Container>
        {isCitiesLoading || !categories ? (
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
