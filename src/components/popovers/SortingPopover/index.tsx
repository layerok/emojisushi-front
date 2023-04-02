import { DropdownPopover } from "../DropdownPopover";
import { SortOrderButton } from "../../buttons/SortOrderButton";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Await, useAsyncValue, useRouteLoaderData } from "react-router-dom";
import { loader } from "~pages/Category";
import MenuApi from "~api/menu.api";

export const SortingPopover = ({
  showSkeleton = false,
}: {
  showSkeleton?: boolean;
}) => {
  const { productsQuery } = useRouteLoaderData("category") as ReturnType<
    typeof loader
  >["data"];

  if (showSkeleton) {
    return <Skeleton width={120} height={25} />;
  }
  return (
    <Suspense fallback={<Skeleton width={120} height={25} />}>
      <Await resolve={productsQuery}>
        <InternalSortingDropdown />
      </Await>
    </Suspense>
  );
};

const InternalSortingDropdown = () => {
  const productsQuery = useAsyncValue() as Awaited<
    ReturnType<typeof MenuApi.getProducts>
  >;

  const options = productsQuery.data.sort_options;

  const initialSelectedIndex = options.indexOf("bestsellar");

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
        // todo: sort products
      }}
    >
      {({ selectedOption }) => (
        <SortOrderButton text={t(`sort.${selectedOption}`)} />
      )}
    </DropdownPopover>
  );
};
