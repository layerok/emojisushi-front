import * as S from "./styled";
import { useIsDesktop, useIsMobile } from "~common/hooks/useBreakpoint";
import { FlexBox } from "~components/FlexBox";
import { observer } from "mobx-react";
import { ICategory } from "~api/menu.api.types";
import { Search } from "./components/Search";
import {
  HorizontalMenu,
  UnderVerticalMenu,
  VerticalMenu,
  NotDesktopView,
} from "./components";

type SidebarProps = { loading?: boolean; categories?: ICategory[] };

export const Sidebar = observer(
  ({ loading = false, categories = [] }: SidebarProps) => {
    const isMobile = useIsMobile();
    const isDesktop = useIsDesktop();

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
            <VerticalMenu categories={categories} loading={loading} />
            <UnderVerticalMenu loading={loading} />
          </>
        ) : (
          <HorizontalMenu loading={loading} categories={categories} />
        )}
      </S.Sidebar>
    );
  }
);
