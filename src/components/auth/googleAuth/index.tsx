import React, {useEffect} from 'react';
import {useLoginViaGoogleMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateGoogleAuthUrl,
    redirect
} from '../../../utils/misc';
import styled from 'styled-components';
import {Loader} from '../../Loader';
import {AUTH_GOOGLE} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';

export const GoogleAuth = (props: { redirectUrl: string }) => {

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
        <Loader/>
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
                addCarrotTag(AUTH_GOOGLE);
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
