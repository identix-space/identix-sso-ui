import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateFacebookAuthUrl,
    redirect
} from '../../../utils/misc';
import styled from 'styled-components';
import {AUTH_FB} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';
import {TWO_SEC_IN_MS} from '../googleAuth';
import {sendNotify} from '../../../pages/api/tlg';
import {useGetAccessTokenMutation, useGetSsoCodeMutation} from '../../../generated/graphql';

export const UaepassAuth = (props: { redirectUrl: string }) => {
    const [getSsoCode] = useGetSsoCodeMutation();
    const [getAccessToken] = useGetAccessTokenMutation();
    const {setModalIsOpen, setAlertText, setAlertType} = useModalAlertSettings();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (props?.redirectUrl) {
                await loginUserViaUaepass(extractCodeFromUrl(generateAfterWeb2OutServicesUserLogin(router.asPath)));
            }
        })();
    }, [router]);

    async function loginUserViaUaepass(authCode: string) {
        try {
            const ssoCodeResponse = await getSsoCode({variables: {
                code: authCode,
                redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/uaepass-auth`
            }});

            const accessTokenResponse = await getAccessToken({
                variables: {
                    code: ssoCodeResponse.data!.getCodeByUaepass
                }
            });

            const accessToken = accessTokenResponse.data?.getAccessToken;

            if (accessToken) {
                setAlertType('success');
                setAlertText('Everything is fine. Redirecting you...');
                setModalIsOpen(true);
                redirect(`${props.redirectUrl}?token=${accessToken}`);
            } else {
                sendNotify(JSON.stringify(accessToken));
                setAlertType('error');
                setAlertText('Something went wrong, we redirect you back...');
                setModalIsOpen(true);
                setTimeout(() => {
                    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                }, TWO_SEC_IN_MS);
            }
        } catch (e: any) {
            console.log(e);
            sendNotify(e.message);
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
            <ModalAlert/>
        </>
    );
};

export const UaeAuthUrl = (props: { redirectUrl: string }) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <ButtonSocial
            onClick={() => {
                redirect(generateFacebookAuthUrl(props.redirectUrl));
                addCarrotTag(AUTH_FB);
            }}/>
    );
};

const ButtonSocial = styled.button`
  width: 30%;
  height: 60px;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 4px 37px rgba(51, 137, 132, 0.3);
  cursor: pointer;
  transition: all .1s ease-in;
  //noinspection CssUnknownTarget
  background: url('assets/uaepass-logo.png') center/30% 60% no-repeat, #FFFFFF;

  &:hover {
    box-shadow: 0 4px 37px rgba(51, 137, 132, 0.5);
  }

  @media screen and (max-width: 1440px) {
    height: 55px;
  }

  @media screen and (max-width: 420px) {
    height: 52px;
    background-size: 50% 75%;
  }
`;


