import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useSubmit } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { DropdownPopover } from "~components";
import { SortKey } from "~api/types";
import { SortOrderSvg } from "src/components/svg/SortOrderSvg";
import { UIButton } from "~common/ui-components/UIButton/UIButton";

type TSortingPopoverProps = {
  loading?: boolean;
};

export const SortingPopover = ({ loading = false }: TSortingPopoverProps) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

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

  const sortFromUrl = searchParams.get("sort") as SortKey;

  // todo: validate provided search params from url
  const initialSelectedIndex = options.indexOf(
    sortFromUrl ? sortFromUrl : "default"
  );

  return (
    <DropdownPopover
      asFlatArray={true}
      options={options}
      resolveOptionName={({ option }) => {
        // todo: don't build dynamic translations keys
        return t(`sort.${option}`);
      }}
      selectedIndex={initialSelectedIndex}
      onSelect={({ option, index }) => {
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
        <UIButton text={t(`sort.${selectedOption}`)}>
          <SortOrderSvg />
        </UIButton>
      )}
    </DropdownPopover>
  );
};
