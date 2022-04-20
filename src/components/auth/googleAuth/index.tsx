import React, {useEffect} from 'react';
import {useGenerateAuthCodeMutation, useLoginViaGoogleMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {useClientStore} from '../utils';
import {
    extractCodeFromUrl,
    extractRedirectUriFromUrl,
    generateAfterWeb2OutServisesUserLogin,
    generateGoogleAuthUrl,
    redirect
} from '../../../utils/misc';
import styled from 'styled-components';

export const GoogleAuth = () => {

    const [loginViaGoogleMutation] = useLoginViaGoogleMutation();
    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const router = useRouter();
    const {setUserCode, setUserToken, code} = useClientStore();
    const [authCode, setAuthCode] = React.useState('');

    useEffect(() => {
        setAuthCode(extractCodeFromUrl(generateAfterWeb2OutServisesUserLogin(router.asPath)));
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
            setUserToken(authViaGoogleData.data.loginViaGoogle.token);
            const authCodeData = await generateAuthCodeMutation();
            if (authCodeData.data?.generateAuthCode) {
                setUserCode(authCodeData.data?.generateAuthCode);
                try {
                    redirect(`${extractRedirectUriFromUrl(generateAfterWeb2OutServisesUserLogin(router.asPath))}?code=${code}`);
                } catch (e) {
                    redirect(`${process.env.NEXT_PUBLIC_APP_URL}?code=${code}`);
                }
            }
        }
    }

    return (
        <>
            <button onClick={loginUserViaGoogle}>Enter via Google</button>
        </>
    );
};

export const GoogleAuthUrl = () => {
    return (
        <Button
            onClick={() => {
                redirect(generateGoogleAuthUrl('https://yandex.com'));
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
