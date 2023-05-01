import * as S from "./styled";
import { useBreakpoint2 } from "~common/hooks";
import { FlexBox } from "~components";
import { ICategory } from "~api/types";
import { Search } from "~components/Search";
import { VerticalMenu, Socials, WishlistsMenuItem } from "./components";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

export const Sidebar = ({ loading = false, categories = [] }: SidebarProps) => {
  const { isMobile } = useBreakpoint2();
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
      </FlexBox>
      <VerticalMenu categories={categories} loading={loading} />
      <WishlistsMenuItem loading={loading} />
      <Socials loading={loading} />
    </S.Sidebar>
  );
};
