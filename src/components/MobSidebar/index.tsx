import * as S from "./styled";
import { FlexBox, SortingPopover } from "~components";
import { ICategory } from "~api/types";
import { Search } from "../Search";
import { HorizontalMenu } from "./components";

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

      <HorizontalMenu loading={loading} categories={categories} />
    </S.Sidebar>
  );
};
