import { Outlet } from "react-router-dom";
import LocalStorageService from "~services/local-storage.service";

export const LocationSaver = () => {
  return <Outlet />;
};

export const Component = LocationSaver;

Object.assign({
  displayName: "LazyLocationSaver",
});

export const loader = ({ params }) => {
  if (params.citySlug) {
    LocalStorageService.set("city", params.citySlug);
  } else {
    LocalStorageService.remove("city");
  }

  if (params.spotSlug) {
    LocalStorageService.set("spot", params.spotSlug);
  } else {
    LocalStorageService.remove("spot");
  }
  return true;
};

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  return (
    currentParams.spotSlug !== nextParams.spotSlug ||
    currentParams.citySlug !== nextParams.spotSlug
  );
};
