import * as S from "./styled";
import { useIsDesktop, useIsMobile } from "~common/hooks";
import { FlexBox } from "~components";
import { ICategory } from "~api/types";
import { Search } from "./components/Search";
import {
  HorizontalMenu,
  UnderVerticalMenu,
  VerticalMenu,
  NotDesktopView,
} from "./components";
import { useParams } from "react-router-dom";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

export const Sidebar = ({ loading = false, categories = [] }: SidebarProps) => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const { spotSlug } = useParams();

  const publishedCategories = categories
    .filter((category) => category.published)
    .filter((category) => {
      return !category.hide_categories_in_spot
        .map((spot) => spot.slug)
        .includes(spotSlug);
    });

  // todo: make sidebar sticky
  return (
    <S.Sidebar>
      <FlexBox
        style={{ width: "100%" }}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={isMobile ? "column" : "row"}
      >
        <Search loading={loading} />

        {!isDesktop && <NotDesktopView loading={loading} />}
      </FlexBox>
      {isDesktop ? (
        <>
          <VerticalMenu categories={publishedCategories} loading={loading} />
          <UnderVerticalMenu loading={loading} />
        </>
      ) : (
        <HorizontalMenu loading={loading} categories={publishedCategories} />
      )}
    </S.Sidebar>
  );
};
