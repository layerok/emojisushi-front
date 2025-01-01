import { Container, MobSidebar, Sidebar } from "~components";
import { Banner } from "~domains/product/pages/ProductPage/Banner";
import { Page } from "~components/Page";
import { Outlet, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { bannerQuery } from "~domains/banner/banner.query";
import styled from "styled-components";
import { media } from "~common/custom-media";
import { PRODUCT_ID_SEARCH_QUERY_PARAM } from "~domains/product/products.query";
import { useShowModal } from "~modal";
import { ModalIDEnum } from "~common/modal.constants";
import { catalogQuery } from "~domains/catalog/catalog.query";

const MenuLayout = () => {
  const { data: banners, isLoading: isBannersLoading } = useQuery(bannerQuery);
  const { data: catalogData, isLoading: isCatalogLoading } =
    useQuery(catalogQuery);

  const showModal = useShowModal();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      {(isBannersLoading || (banners?.data && !!banners.data.length)) && (
        <Container>
          <StyledBannerContainer>
            <Banner
              loading={isBannersLoading}
              items={(banners?.data || []).map((banner) => ({
                id: banner.id + "",
                desktop_image: banner.image.path,
                mobile_image: banner.image_small.path,
                clickable: !!banner.product?.id,
                onClick: () => {
                  if (banner.product.id) {
                    searchParams.set(
                      PRODUCT_ID_SEARCH_QUERY_PARAM,
                      banner.product.id + ""
                    );
                    setSearchParams(searchParams, {
                      preventScrollReset: true,
                    });
                    showModal(ModalIDEnum.ProductModal);
                  }
                },
              }))}
            />
          </StyledBannerContainer>
        </Container>
      )}

      <Page>
        <Container>
          <StyledContainer>
            {isCatalogLoading ? (
              <>
                <Sidebar loading />
                <MobSidebar loading />
              </>
            ) : (
              <>
                <Sidebar categories={catalogData.categories} />
                <MobSidebar categories={catalogData.categories} />
              </>
            )}
            <div style={{ flexGrow: 1 }}>
              <Outlet />
            </div>
          </StyledContainer>
        </Container>
      </Page>
    </>
  );
};

const StyledBannerContainer = styled.div`
  margin-bottom: 0;
  margin-top: 50px;
  ${media.lessThan("tablet")`
    margin-top: 27px;
    margin-bottom: 27px;
  `}
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${media.lessThan("pc")`
    flex-direction: column;
  `}
`;

export const Component = MenuLayout;
