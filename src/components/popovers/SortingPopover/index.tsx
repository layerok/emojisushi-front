import { DropdownPopover } from "../DropdownPopover";
import { SortOrderButton } from "../../buttons/SortOrderButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { SortKey } from "~api/menu.api.types";
import { useSubmit } from "react-router-dom";

export const SortingPopover = ({
  showSkeleton = false,
}: {
  showSkeleton?: boolean;
}) => {
  if (showSkeleton) {
    return <Skeleton width={120} height={25} />;
  }
  // todo: fetch this options from backend, becase backend is a source of truth
  // but for now, it is ok
  const options: SortKey[] = [
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
  const initialSelectedIndex = options.indexOf("bestseller");
  const submit = useSubmit();

  const [selectedIndex, setSelectedIndex] = useState(
    initialSelectedIndex === -1 ? 0 : initialSelectedIndex
  );
  const { t } = useTranslation();

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
        submit(fd);
      }}
    >
      {({ selectedOption }) => (
        <SortOrderButton text={t(`sort.${selectedOption}`)} />
      )}
    </DropdownPopover>
  );
};
