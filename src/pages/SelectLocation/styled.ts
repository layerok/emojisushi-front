import styled from 'styled-components';
import { prop, theme } from 'styled-tools';
import media from '../../common/custom-media';

const Location = styled.li`
  display: flex;
  flex-direction: column;

  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  color: #ffffff;
  text-decoration: none;

  position: relative;
`;

Location.Content = styled.div`
  background: #1c1c1c;
  border: 1px solid #1c1c1c;
  border-radius: 10px;

  transition: 0.3s ease-out;

  padding: 10px;

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 2;
`;

Location.Head = styled.div`
  display: inline-flex;
  align-items: center;

  margin-bottom: 10px;

  gap: 5px;

  font-weight: 400;
  font-size: 13px;
  line-height: 16px;

  color: ${theme('link.active')};
`;

Location.Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('${prop('src')}'), linear-gradient(0deg, #232323, #232323);

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  margin: 0 auto;
  position: relative;

  border-radius: 0px 0px 10px 10px;
  overflow: hidden;

  transition: 0.3s ease-out;

  position: absolute;
  top: calc(100% - 14px);
  left: 0;
  z-index: 1;

  &:before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(20, 20, 20, 0.15), rgba(20, 20, 20, 0.15));
    pointer-events: none;
  }

  ${media.lessThan('tablet')`
    display: none;
  `}
`;

const Locations = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  padding: 60px 0;
  padding-bottom: 200px;

  min-height: 100vh;

  ${media.lessThan('tablet')`
      padding: 50px 0;
    `}
`;

Locations.Container = styled.div`
  margin: 0 auto;
  max-width: 598px;
  width: 100%;

  padding: 0 12px;
`;

Locations.Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  margin-bottom: 50px;

  gap: 30px;

  ${media.lessThan('mobile')`
    margin-bottom: 60px;
  `}
`;

Locations.Label = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  text-transform: uppercase;
  color: #fff;

  ${media.lessThan('mobile')`
    font-size: 1rem;
    line-height: 1.25rem;
  `}
`;

Locations.Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  > ul {
    display: flex;
    flex-direction: column;
    gap: 30px;

    > li {
      display: flex;
      flex-direction: column;
      gap: 15px;

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;

        ${media.lessThan('mobile')`
         flex-direction:column; 
         gap: 15px;
         `}

        & > * {
          width: calc(100% / 2 - 15px);

          ${media.lessThan('mobile')`
             width: 100%;
         `}
        }
      }

      a {
        color: #ffffff;
        text-decoration: none;
        position: relative;

        &:hover {
          z-index: 4;

          ${Location.Content} {
            border-color: ${theme('link.active')};
          }
          ${Location.Image} {
            height: 178px;

            ${media.lessThan('tablet')`
            height: 0;
            `}
          }
        }
      }

      > span {
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;

        text-transform: uppercase;

        color: #ffffff;
      }
    }
  }
`;

export { Locations, Location };
