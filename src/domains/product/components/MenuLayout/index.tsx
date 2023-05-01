import { Suspense } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { ICategory } from "~api/types";
import { MobSidebar, AwaitAll, Sidebar, FlexBox } from "~components";
import { PublishedCategories } from "~domains/category/components/PublishedCategories";
import { WishlistPageLoaderData } from "~domains/wishlist/types";
import { LayoutRouteLoaderData } from "~layout/Layout";
import * as S from "./styled";

// todo: it looks like RR route layout
export const MenuLayout = ({ children }) => {
  const { categories } = useLoaderData() as WishlistPageLoaderData;
  const { cities } = useRouteLoaderData("layout") as LayoutRouteLoaderData;

  return (
    <S.Container>
      <Suspense fallback={<Fallback />}>
        <AwaitAll categories={categories} cities={cities}>
          {({ categories }) => (
            <PublishedCategories categories={categories.data}>
              {({ categories }) => <InternalSidebar categories={categories} />}
            </PublishedCategories>
          )}
        </AwaitAll>
      </Suspense>

      {children}
    </S.Container>
  );
};

const Fallback = () => {
  return (
    <>
      <Sidebar loading />
      <MobSidebar loading />
    </>
  );
};

const InternalSidebar = ({ categories }: { categories: ICategory[] }) => {
  return (
    <>
      <Sidebar categories={categories} />
      <MobSidebar categories={categories} />
    </>
  );
};
