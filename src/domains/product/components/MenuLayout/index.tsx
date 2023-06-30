import { MobSidebar, Sidebar, Container } from "~components";
import { PublishedCategories } from "~domains/category/components/PublishedCategories";
import * as S from "./styled";
import { useQuery } from "@tanstack/react-query";
import { citiesQuery } from "~queries/cities.query";

// todo: it looks like RR route layout
export const MenuLayout = ({ children, categories }) => {
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
          <PublishedCategories categories={categories.data}>
            {({ categories }) => (
              <>
                <Sidebar categories={categories} />
                <MobSidebar categories={categories} />
              </>
            )}
          </PublishedCategories>
        )}
        {children}
      </S.Container>
    </Container>
  );
};
