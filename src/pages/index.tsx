import React, {ReactNode} from 'react';
import styled from 'styled-components';

export default function IndexPage(): ReactNode {
    return (
        <div>
            <Logo>Identix.SSO</Logo>
            <Link href="https://t.me/avarab">Connect website</Link>
        </div>
    );
}

const Logo = styled.div`
  color: #FFFFFF;
  font-size: 10vw;
  font-weight: 100;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    font-size: 15vw;
  }
`;

const Link = styled.a`
  color: #FFFFFF;
  font-size: 1.2vw;
  font-weight: 100;
  text-decoration: none;
  zoom: 1;
  margin-bottom: 80px;

  &:hover {
    color: white;
    text-decoration: underline;
  }

  // mobile
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;
