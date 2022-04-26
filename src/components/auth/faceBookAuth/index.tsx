import React, {useEffect} from 'react';
import {useLoginViaFacebookMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateFacebookAuthUrl,
    redirect
} from '../../../utils/misc';
import styled, {keyframes} from 'styled-components';

export const FacebookAuth = (props: { redirectUrl: string }) => {

    const [loginViaFacebookMutation] = useLoginViaFacebookMutation();
    const router = useRouter();
    const [authCode, setAuthCode] = React.useState('');

    useEffect(() => {
        setAuthCode(extractCodeFromUrl(generateAfterWeb2OutServicesUserLogin(router.asPath)));
        if (authCode !== '') {
            (async () => {
                await loginUserViaFacebook();
            })();
        }
    }, [router]);

    async function loginUserViaFacebook() {
        const authViaFacebookData = await loginViaFacebookMutation({
            variables: {
                code: authCode
            }
        });
        if (authViaFacebookData.data?.loginViaFacebook.token) {
            redirect(`${props.redirectUrl}?token=${authViaFacebookData.data?.loginViaFacebook.token}`);
        } else {
            console.error('Debug: No "authViaFacebookData.data?.loginViaFacebook.token"');
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Loader p={true}><span>P</span></Loader>
            <Loader><span>r</span></Loader>
            <Loader p={true}><span>o</span></Loader>
            <Loader><span>c</span></Loader>
            <Loader p={true}><span>e</span></Loader>
            <Loader><span>s</span></Loader>
            <Loader p={true}><span>s</span></Loader>
            <Loader><span>i</span></Loader>
            <Loader p={true}><span>n</span></Loader>
            <Loader><span>g</span></Loader>
            <Loader p={true}><span>.</span></Loader>
            <Loader><span>.</span></Loader>
            <Loader p={true}><span>.</span></Loader>
            <Loader><span>.</span></Loader>
        </div>
    );
};

export const FacebookAuthUrl = (props: { redirectUrl: string }) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <Button
            onClick={() => {
                redirect(generateFacebookAuthUrl(props.redirectUrl));
            }}/>
    );
};

const Button = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all .1s ease-in;
  background: url('assets/facebook-icon.svg') 49% 53%/40% no-repeat;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  }
`;

interface LoaderProps {
    primary?: boolean;
    p?: boolean;
    r?: boolean;
}

const moveUp = keyframes`
  from {
    margin-top: 100%;
    height: 20%;
  }

  40% {
    margin-top: 0%;
    height: 10%;
  }

  60% {
    margin-top: 0%;
    height: 10%;
  }

  to {
    margin-top: 100%;
    height: 20%;
  }
`;


const Loader = styled.p<LoaderProps>`
  color: #FFFFFF;
  animation: ${props => props.p ? moveUp : stay} ${props => props.p ? 4 : 0}s  linear infinite;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 80px;
`;

const stay = keyframes`
  
`;

