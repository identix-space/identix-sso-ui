import React, {ReactNode} from 'react';
import styled from 'styled-components';

export default function IndexPage(): ReactNode {
    return (
        <Wrapper>
            <Logo>Identix.SSO</Logo>
            <Link href="https://t.me/avarab">Connect website</Link>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const Logo = styled.div`
  color: #FFFFFF;
  font-size: 10vw;
  font-weight: 100;
  margin-bottom: -20px;

  @media (max-width: 768px) {
    font-size: 15vw;
  }
`;

const Link = styled.a`
  color: #FFFFFF;
  font-size: 1.2vw;
  font-weight: 100;
  zoom: 1;
  margin-bottom: 80px;
  text-decoration: underline;

  &:hover {
    color: white;
    text-decoration: none;
  }

  // mobile
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;
