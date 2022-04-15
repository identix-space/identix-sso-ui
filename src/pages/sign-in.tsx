import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {SignInWith} from '../components/signIn';

export default function SignInPage(): ReactNode {
    return (
        <Main>
            <SignInWith/>
        </Main>
    );
}

const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: radial-gradient(301.88% 301.88% at -10.07% -36.57%, #CBFFD0 0%, #FFFFFF 33.62%, #EEFF2E 90.48%) rgba(11, 14, 80, 0.21);
    background-blend-mode: multiply;
`;
