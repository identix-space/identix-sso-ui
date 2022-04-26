import React, {useEffect} from 'react';
import {useLoginViaGoogleMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateGoogleAuthUrl,
    redirect
} from '../../../utils/misc';
import styled, {keyframes} from 'styled-components';

export const GoogleAuth = (props: { redirectUrl: string }) => {
    console.log('GoogleAuth props', props);

    const [loginViaGoogleMutation] = useLoginViaGoogleMutation();
    const router = useRouter();
    const [authCode, setAuthCode] = React.useState('');

    useEffect(() => {
        setAuthCode(extractCodeFromUrl(generateAfterWeb2OutServicesUserLogin(router.asPath)));
        if (authCode !== '') {
            (async () => {
                await loginUserViaGoogle();
            })();
        }
    }, [router]);

    async function loginUserViaGoogle() {
        console.log(router.query.code);
        const authViaGoogleData = await loginViaGoogleMutation({
            variables: {
                code: authCode
            }
        });
        if (authViaGoogleData.data?.loginViaGoogle.token) {
            redirect(`${props.redirectUrl}?token=${authViaGoogleData.data.loginViaGoogle.token}`);
        } else {
            console.log('Debug: authViaGoogleData.data?.loginViaGoogle.token is null');
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

export const GoogleAuthUrl = (props: { redirectUrl: string }) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <Button
            onClick={() => {
                redirect(generateGoogleAuthUrl(props.redirectUrl));
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
  background: url('assets/google-chrome-icon.svg') 45% 56%/86% no-repeat;

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


