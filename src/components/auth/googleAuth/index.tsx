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
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';

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
            if (authViaGoogleData.data?.loginViaGoogle.token) {
                setAlertType('success');
                setAlertText('Everything is fine. Redirecting you...');
                setModalIsOpen(true);
                redirect(`${props.redirectUrl}?token=${authViaGoogleData.data.loginViaGoogle.token}`);
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
