import { DropdownPopover } from "~components";
import { SortOrderButton } from "~components/buttons/SortOrderButton";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { SortKey } from "~api/types";
import { useSearchParams, useSubmit } from "react-router-dom";

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
  const [searchParams] = useSearchParams();

  const sortFromUrl = searchParams.get("sort") as SortKey;

  // todo: validate provided search params from url
  const initialSelectedIndex = options.indexOf(
    sortFromUrl ? sortFromUrl : "default"
  );
  const submit = useSubmit();

  const { t } = useTranslation();

  // todo: don't build dynamic translations keys

  return (
    <DropdownPopover
      asFlatArray={true}
      options={options}
      resolveOptionName={({ option }) => {
        return t(`sort.${option}`);
      }}
      selectedIndex={initialSelectedIndex}
      onSelect={({ option, index, close }) => {
        close();

        const fd = new FormData();

        Array.from(searchParams.entries())
          .filter(([key]) => key !== "sort")
          .forEach(([key, val]) => {
            fd.append(key, val);
          });

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
