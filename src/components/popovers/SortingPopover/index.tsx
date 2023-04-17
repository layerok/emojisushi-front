import { DropdownPopover } from "~components/popovers/DropdownPopover";
import { SortOrderButton } from "~components/buttons/SortOrderButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { SortKey } from "~api/menu.api.types";
import { useLocation, useSearchParams, useSubmit } from "react-router-dom";

type TSortingPopoverProps = {
  loading?: boolean;
};

export const SortingPopover = ({ loading = false }: TSortingPopoverProps) => {
  if (loading) {
    return <Skeleton width={120} height={25} />;
  }
  // todo: fetch this options from backend, becase backend is a source of truth
  // but for now, it is ok
  const options: SortKey[] = [
    "default",
    "bestseller",
    "latest",
    "oldest",
    "price_high",
    "price_low",
    "ratings",
  ];
  return <InternalSortingDropdown options={options} />;
};

const InternalSortingDropdown = ({ options = [] }: { options?: SortKey[] }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const sortFromUrl = searchParams.get("sort") as SortKey;
  // todo: validate provided search params from url
  const initialSelectedIndex = options.indexOf(
    sortFromUrl ? sortFromUrl : "default"
  );
  const submit = useSubmit();

  const [selectedIndex, setSelectedIndex] = useState(
    initialSelectedIndex === -1 ? 0 : initialSelectedIndex
  );
  const { t } = useTranslation();

  // todo: don't build dynamic translations keys

  return (
    <DropdownPopover
      asFlatArray={true}
      options={options}
      resolveOptionName={({ option }) => {
        return t(`sort.${option}`);
      }}
      selectedIndex={selectedIndex}
      onSelect={({ option, index, close }) => {
        close();
        setSelectedIndex(index);
        const fd = new FormData();
        fd.append("sort", option);
        if (searchParams.has("q")) {
          fd.append("q", searchParams.get("q"));
        }
        // todo: preserve all query parameters when doing sorting

        submit(fd);
      }}
    >
      {({ selectedOption }) => (
        <SortOrderButton text={t(`sort.${selectedOption}`)} />
      )}
    </DropdownPopover>
  );
};
