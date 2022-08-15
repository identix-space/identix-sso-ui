import React from 'react';
import styled from 'styled-components';

type Props = {
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({children}) => {

    return (
        <LayoutWrapper>
            {children}
        </LayoutWrapper>
    );
};

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.47), rgba(255, 255, 255, 0.47)), linear-gradient(92.25deg, #8F5AE0 -10.04%, #37B9C6 116.12%);
  overflow: hidden;

  @media screen and (max-width: 420px) {
    padding: 15px;
  }
`;

export default Layout;
