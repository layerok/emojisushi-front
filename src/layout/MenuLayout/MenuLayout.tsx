import { Container, MobSidebar, Sidebar } from "~components";
import { Banner } from "~domains/product/pages/ProductPage/Banner";
import { Page } from "~components/Page";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { bannerQuery } from "~queries/banner.query";
import styled from "styled-components";
import { media } from "~common/custom-media";
import { categoriesQuery } from "~queries";

const MenuLayout = () => {
  const { data: banners, isLoading: isBannersLoading } = useQuery(bannerQuery);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
  });

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
                onClick: () => {
                  // todo: redirect to the product page
                  // todo: build the product page
                },
              }))}
            />
          </StyledBannerContainer>
        </Container>
      )}

      <Page>
        <Container>
          <StyledContainer>
            {isCategoriesLoading ? (
              <>
                <Sidebar loading />
                <MobSidebar loading />
              </>
            ) : (
              <>
                <Sidebar categories={categories.data} />
                <MobSidebar categories={categories.data} />
              </>
            )}
            <Outlet />
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
