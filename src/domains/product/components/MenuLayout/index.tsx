import { Suspense } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useIsDesktop } from "~common/hooks";
import { MobSidebar, AwaitAll, Sidebar, FlexBox } from "~components";
import { PublishedCategories } from "~domains/category/components/PublishedCategories";
import { WishlistPageLoaderData } from "~domains/wishlist/types";
import { LayoutRouteLoaderData } from "~layout/Layout";

// todo: it looks like RR route layout
export const MenuLayout = ({ children }) => {
  const { categories } = useLoaderData() as WishlistPageLoaderData;
  const isDesktop = useIsDesktop();

  const { cities } = useRouteLoaderData("layout") as LayoutRouteLoaderData;

  return (
    <FlexBox flexDirection={isDesktop ? "row" : "column"}>
      <Suspense
        fallback={isDesktop ? <Sidebar loading /> : <MobSidebar loading />}
      >
        <AwaitAll categories={categories} cities={cities}>
          {({ categories }) => (
            <PublishedCategories categories={categories.data}>
              {({ categories }) =>
                isDesktop ? (
                  <Sidebar categories={categories} />
                ) : (
                  <MobSidebar categories={categories} />
                )
              }
            </PublishedCategories>
          )}
        </AwaitAll>
      </Suspense>

      {children}
    </FlexBox>
  );
};
