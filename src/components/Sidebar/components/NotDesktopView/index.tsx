import { useIsMobile } from "src/common/hooks/useBreakpoint";
import { FlexBox } from "src/components/FlexBox";
import { SortingPopover } from "src/components/popovers/SortingPopover";

// todo: rename

export const NotDesktopView = ({ loading = false }: { loading?: boolean }) => {
  const isMobile = useIsMobile();
  return (
    <FlexBox
      justifyContent={isMobile ? "space-between" : "flex-end"}
      style={{
        width: "100%",
      }}
    >
      {/* <FiltersModal>
        <FiltersButton text={t("common.filters")} />
      </FiltersModal> */}
      <div
        style={{
          marginLeft: "30px",
        }}
      >
        <SortingPopover loading={loading} />
      </div>
    </FlexBox>
  );
};
