import * as S from "./styled";
import { useBreakpoint, useBreakpoint2 } from "~common/hooks";
import { FlexBox, SortingPopover } from "~components";
import { ICategory } from "~api/types";
import { Search } from "../Search";
import { HorizontalMenu } from "./components";
import { useParams } from "react-router-dom";
import {
  MOBILE_BREAKPOINT_KEY,
  TABLET_BREAKPOINT_KEY,
} from "~common/custom-media";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

export const MobSidebar = ({
  loading = false,
  categories = [],
}: SidebarProps) => {
  const breakpoint = useBreakpoint2();

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
        flexDirection={breakpoint.isMobile ? "column" : "row"}
      >
        <div
          style={{
            width: breakpoint.isTablet ? 255 : "100%",
          }}
        >
          <Search loading={loading} />
        </div>

        <FlexBox
          justifyContent={"flex-end"}
          style={{
            width: "100%",
          }}
        >
          <SortingPopover loading={loading} />
        </FlexBox>
      </FlexBox>

      <HorizontalMenu loading={loading} categories={publishedCategories} />
    </S.Sidebar>
  );
};
