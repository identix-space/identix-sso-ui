import React, {useEffect} from 'react';
import {useLoginViaGoogleMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    decodeFromBase64,
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateGoogleAuthUrl,
    redirect, saveAuthorizationFact
} from '../../../utils/misc';
import styled from 'styled-components';
import {Loader} from '../../Loader';
import {AUTH_GOOGLE} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';
import {GOOGLE_THEME_DEFAULT_VALUE, THEME_HASH_GOOGLE} from '../../../constants';
import {AuthType} from '../../../utils/misc';

export const TWO_SEC_IN_MS = 2000;

export const GoogleAuth = (props: { redirectUrl: string }) => {

    const [loginViaGoogleMutation] = useLoginViaGoogleMutation();
    const {setModalIsOpen, setAlertText, setAlertType} = useModalAlertSettings();
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
        try {
            const authViaGoogleData = await loginViaGoogleMutation({
                variables: {
                    code: authCode
                }
            });
            const googleHash = localStorage.getItem(THEME_HASH_GOOGLE);
            if (typeof window !== undefined && googleHash) {
                const googleId = window.atob(googleHash);
                const isSameGoogleID = GOOGLE_THEME_DEFAULT_VALUE === decodeFromBase64(googleHash) ? true : authViaGoogleData.data?.loginViaGoogle.account.id === Number(googleId);
                if (isSameGoogleID) {
                    if (authViaGoogleData.data?.loginViaGoogle.token) {
                        setAlertType('success');
                        setAlertText('Everything is fine. Redirecting you...');
                        setModalIsOpen(true);
                        saveAuthorizationFact(AuthType.GOOGLE, authViaGoogleData.data?.loginViaGoogle.account.id);
                        redirect(`${props.redirectUrl}?token=${authViaGoogleData.data.loginViaGoogle.token}`);
                    }
                } else {
                    setAlertType('success');
                    setAlertText('Everything is fine. Redirecting you...');
                    setModalIsOpen(true);
                    setTimeout(() => {
                        redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                    }, TWO_SEC_IN_MS);
                }
            }
        } catch (e) {
            setAlertType('error');
            setAlertText('Something went wrong, we redirect you back...');
            setModalIsOpen(true);
            setTimeout(() => {
                redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
            }, TWO_SEC_IN_MS);
        }
    }

    return (
        <>
            <Loader/>
            <ModalAlert/>
        </>
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
