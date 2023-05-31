import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateFacebookAuthUrl,
    redirect
} from '../../../utils/misc';
import styled from 'styled-components';
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';
import {sendNotify} from '../../../pages/api/tlg';
import {useGetAccessTokenMutation, useGetSsoCodeMutation} from '../../../generated/graphql';
import {COLORS} from '../../../utils/colors';

const TWO_SEC_IN_MS = 2000;

type ButtonProps = {
    icon?: string;
    color?: string;
}

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
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
            }} icon="/assets/uaepass-logo.png">UAE Pass</ButtonSocial>
    );
};

const ButtonSocial = styled.button<ButtonProps>`
  width: 100%;
  height: 64px;
  background: ${(props) => (props.color ? props.color : `${COLORS.white}`)};
  box-shadow: 0 4px 37px rgba(51, 137, 132, 0.3);
  border-radius: 8px;
  border: none;
  outline: 0;
  position: relative;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  color: ${(props) => (props.color ? `${COLORS.white}` : '#150B4D')};
  padding: 0 30px;
  cursor: pointer;
  transition: all .1s ease-in;

  &:hover {
    box-shadow: 0 4px 37px rgba(51, 137, 132, 0.5);
  }

  &::after {
    position: absolute;
    content: '';
    width: 42px;
    height: 42px;
    right: 30px;
    top: 10px;
    background: url(${(props) => (props.icon ? props.icon : '')}) center/contain no-repeat;

    @media screen and (max-width: 1440px) {
      top: 8px;
      right: 25px;
      width: 38px;
      height: 38px;
    }
  }

  &[disabled] {
    pointer-events: none;
    color: darkgray;
    border: 1.5px solid #e1e1e1;
  }

  &[disabled]::after {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }

  @media screen and (max-width: 1440px) {
    height: 56px;
    padding: 0 25px;
  }
`;


