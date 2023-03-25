import styled from 'styled-components';
import { theme } from 'styled-tools';
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


const Locations = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  padding: 60px 0;
  padding-bottom: 100px;

  min-height: 100vh;

  ${media.lessThan('tablet')`
      padding: 50px 0;
    `}
`;

Locations.Container = styled.div`
  margin: 0 auto;
  max-width: calc(598px + 24px);
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
