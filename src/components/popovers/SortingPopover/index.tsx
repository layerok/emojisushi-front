import { DropdownPopover } from "../DropdownPopover";
import { SortOrderButton } from "../../buttons/SortOrderButton";
import { Suspense, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import {
  Await,
  UNSAFE_RouteContext,
  useAsyncValue,
  useRouteLoaderData,
} from "react-router-dom";
import { loader } from "~pages/Category";
import { IGetProductsResponse } from "~api/menu.api";

const invariant = (condition, message) => {
  if (!condition) {
    throw message;
  }
};

const useRouteContext = () => {
  return useContext(UNSAFE_RouteContext);
};

const useCurrentRouteId = () => {
  const route = useRouteContext();
  const thisRoute = route.matches[route.matches.length - 1];
  invariant(
    thisRoute.route.id,
    `useCurrentRouteId can only be used on routes that contain a unique "id"`
  );
  return thisRoute.route.id;
};

export const SortingPopover = ({
  showSkeleton = false,
}: {
  showSkeleton?: boolean;
}) => {
  const routeId = useCurrentRouteId();

  // todo: pass sort_options as props
  const { productsQuery } = useRouteLoaderData(routeId) as ReturnType<
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
  const productsQuery = useAsyncValue() as IGetProductsResponse;

  const options = productsQuery.sort_options;

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
