import * as S from "./styled";
import { ICategory } from "~api/types";
import { Search } from "~components/Search";
import { SidebarMenu, Socials, WishlistsMenuItem } from "./components";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

export const Sidebar = ({ loading = false, categories = [] }: SidebarProps) => {
  // todo: make sidebar sticky
  return (
    <S.Sidebar>
      <S.SearchContainer>
        <Search loading={loading} />
      </S.SearchContainer>
      <SidebarMenu categories={categories} loading={loading} />
      <WishlistsMenuItem loading={loading} />
      <Socials loading={loading} />
    </S.Sidebar>
  );
};
