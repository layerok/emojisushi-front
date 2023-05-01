import { Suspense } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router-dom";
import { useBreakpoint2 } from "~common/hooks";
import { MobSidebar, AwaitAll, Sidebar, FlexBox } from "~components";
import { PublishedCategories } from "~domains/category/components/PublishedCategories";
import { WishlistPageLoaderData } from "~domains/wishlist/types";
import { LayoutRouteLoaderData } from "~layout/Layout";

// todo: it looks like RR route layout
export const MenuLayout = ({ children }) => {
  const { categories } = useLoaderData() as WishlistPageLoaderData;

  const breakpoint = useBreakpoint2();

  const { cities } = useRouteLoaderData("layout") as LayoutRouteLoaderData;

  return (
    <FlexBox flexDirection={breakpoint.isDesktop ? "row" : "column"}>
      <Suspense
        fallback={
          breakpoint.isDesktop ? <Sidebar loading /> : <MobSidebar loading />
        }
      >
        <AwaitAll categories={categories} cities={cities}>
          {({ categories }) => (
            <PublishedCategories categories={categories.data}>
              {({ categories }) =>
                breakpoint.isDesktop ? (
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
