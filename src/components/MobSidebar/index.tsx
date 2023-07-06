import * as S from "./styled";
import { Chip, FlexBox, SortingPopover } from "~components";
import { ICategory } from "~api/types";
import { Search } from "../Search";
import { ChipCloud } from "~components";
import { NavLink } from "react-router-dom";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

export const MobSidebar = ({
  loading = false,
  categories = [],
}: SidebarProps) => {
  // todo: make sidebar sticky
  return (
    <S.Sidebar>
      <S.Controls>
        <S.SearchContainer>
          <Search loading={loading} />
        </S.SearchContainer>

        <FlexBox
          justifyContent={"flex-end"}
          style={{
            width: "100%",
          }}
        >
          <SortingPopover loading={loading} />
        </FlexBox>
      </S.Controls>

      <ChipCloud loading={loading}>
        {loading ? (
          <>
            <Chip skeletonWidth={80} loading />
            <Chip skeletonWidth={120} loading />
            <Chip skeletonWidth={90} loading />
            <Chip skeletonWidth={100} loading />
            <Chip skeletonWidth={80} loading />
            <Chip skeletonWidth={80} loading />
            <Chip skeletonWidth={105} loading />
          </>
        ) : (
          categories.map((item) => {
            const nextSegments = ["category", item.slug];
            return (
              <NavLink
                key={item.id}
                style={{ textDecoration: "none", flexShrink: 0 }}
                to={"/" + nextSegments.join("/")}
              >
                {({ isActive }) => <Chip isActive={isActive}>{item.name}</Chip>}
              </NavLink>
            );
          })
        )}
      </ChipCloud>
    </S.Sidebar>
  );
};
