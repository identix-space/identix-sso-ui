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
  background: linear-gradient(180deg, #FFFFFF 0%, #EDF5F8 46.88%);
  overflow: hidden;

  @media screen and (max-width: 600px) {
    padding: 20px;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

export default Layout;
