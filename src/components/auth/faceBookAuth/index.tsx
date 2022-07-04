import React, {useEffect} from 'react';
import {useLoginViaFacebookMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    AuthType, decodeFromBase64,
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateFacebookAuthUrl,
    redirect, saveAuthorizationFact
} from '../../../utils/misc';
import styled from 'styled-components';
import {Loader} from '../../Loader';
import {AUTH_FB} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';
import {TWO_SEC_IN_MS} from '../googleAuth';
import {FACEBOOK_THEME_DEFAULT_VALUE, THEME_HASH_FACEBOOK} from '../../../constants';

export const FacebookAuth = (props: { redirectUrl: string }) => {

    const [loginViaFacebookMutation] = useLoginViaFacebookMutation();
    const {setModalIsOpen, setAlertText, setAlertType} = useModalAlertSettings();
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
        try {
            const authViaFacebookData = await loginViaFacebookMutation({
                variables: {
                    code: authCode
                }
            });
            const facebookHash = localStorage.getItem(THEME_HASH_FACEBOOK);
            if (typeof window !== undefined && facebookHash) {
                const facebookId = window.atob(facebookHash);
                const isSameFacebookID = FACEBOOK_THEME_DEFAULT_VALUE === decodeFromBase64(facebookHash) ? true : authViaFacebookData.data?.loginViaFacebook.account.id === Number(facebookId);
                if (isSameFacebookID) {
                    if (authViaFacebookData.data?.loginViaFacebook.token) {
                        setAlertType('success');
                        setAlertText('Everything is fine. Redirecting you...');
                        setModalIsOpen(true);
                        saveAuthorizationFact(AuthType.FACEBOOK, authViaFacebookData.data?.loginViaFacebook.account.id);
                        redirect(`${props.redirectUrl}?token=${authViaFacebookData.data?.loginViaFacebook.token}`);
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
                addCarrotTag(AUTH_FB);
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


