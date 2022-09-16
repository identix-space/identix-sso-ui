import React, {useEffect, useState} from 'react';
import {useGenerateTelegramCodeMutation, useLoginViaTelegramMutation} from '../../../generated/graphql';
import {extractCodeFromUrl, generateTelegramLink, redirect} from '../../../utils/misc';
import styled from 'styled-components';
import {AUTH_GOOGLE} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';
import {Loader} from '../../Loader';
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';
import Image from 'next/image';
import {COLORS} from '../../../utils/colors';
import {sendNotify} from '../../../pages/api/tlg';

export const TWO_SEC_IN_MS = 2000;


export const TelegramAuth = (props: { redirectUrl: string }) => {

    const {setModalIsOpen, setAlertText, setAlertType} = useModalAlertSettings();

    const [generateTelegramCodeMutation] = useGenerateTelegramCodeMutation();

    const [loginViaTelegramMutation] = useLoginViaTelegramMutation();

    const [code, setCode] = useState<string>('');
    const [load, setLoad] = useState<boolean>(true);

    // const [redirectCode, setRedirectCode] = useState<string>('');

    // eslint-disable-next-line sonarjs/cognitive-complexity
    useEffect(() => {
        // eslint-disable-next-line complexity
        (async () => {
            const redirectCode = extractCodeFromUrl(window.location.href);
            if (redirectCode) {
                try {
                    const loginRes = await loginViaTelegramMutation({
                        variables: {
                            code: redirectCode
                        }
                    });
                    if (loginRes) {
                        setAlertType('success');
                        setAlertText('Everything is fine. Redirecting you...');
                        setModalIsOpen(true);
                        redirect(`${loginRes.data?.loginViaTelegram.redirectUri}?token=${loginRes.data?.loginViaTelegram.authResult.token}`);
                    } else {
                        sendNotify(JSON.stringify(loginRes));
                        setAlertType('error');
                        // eslint-disable-next-line sonarjs/no-duplicate-string
                        setAlertText('Something went wrong, we redirect you back...');
                        setModalIsOpen(true);
                        setTimeout(() => {
                            redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                        }, TWO_SEC_IN_MS);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e: any) {
                    sendNotify(e.message);
                    setAlertType('error');
                    // eslint-disable-next-line sonarjs/no-duplicate-string
                    setAlertText(`Something went wrong, we redirect you back. Error: ${e.message}`);
                    setModalIsOpen(true);
                    setTimeout(() => {
                        redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                    }, TWO_SEC_IN_MS);
                }
            } else if (props.redirectUrl) {
                try {
                    const res = await generateTelegramCodeMutation({
                        variables: {
                            redirectUri: props.redirectUrl
                        }
                    });
                    if (!res) {
                        sendNotify(JSON.stringify(res));
                        setAlertType('error');
                        setAlertText('Something went wrong, we redirect you back...');
                        setModalIsOpen(true);
                        setTimeout(() => {
                            redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                        }, TWO_SEC_IN_MS);
                    }
                    if (res.data?.generateTelegramCode) {
                        setCode(res.data.generateTelegramCode);
                        setLoad(false);
                    }
                } catch (e: any) {
                    sendNotify(e.message);
                    setAlertType('error');
                    // eslint-disable-next-line sonarjs/no-duplicate-string
                    setAlertText('Something went wrong, we redirect you back...');
                    setModalIsOpen(true);
                    setTimeout(() => {
                        redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                    }, TWO_SEC_IN_MS);
                }
            }
        })();
    }, [props.redirectUrl]);


    return (
        <>{load
            ? <Loader/>
            : <ConnectWallet>
                <Left>
                    <ImageWrapper>
                        <Image src="/assets/screen-tg.webp" layout="fill" objectFit="contain"/>
                    </ImageWrapper>
                </Left>
                <Right>
                    <TitleBlock>
                        <h1>Pass Telegram verification</h1>
                    </TitleBlock>
                    <List>
                        <li>Open Telegram</li>
                        <li>Press START button</li>
                        <li>Follow the bot instructions</li>
                    </List>
                    <ButtonOpen onClick={() => redirect(generateTelegramLink(code))}>
                        <span>
                        Open Telegram
                        </span>
                    </ButtonOpen>
                </Right>
            </ConnectWallet>
        }
        <ModalAlert/>
        </>

    );
};

export const TelegramAuthUrl = (props: { redirectUrl: string }) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <ButtonSocial
            onClick={() => {
                redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/telegram-auth/?redirect_uri=${props.redirectUrl}`);
                addCarrotTag(AUTH_GOOGLE);
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
  background: url('assets/logo_telegram_icon.svg') center/60% 60% no-repeat, #FFFFFF;

  &:hover {
    box-shadow: 0 4px 37px rgba(51, 137, 132, 0.5);
  }

  @media screen and (max-width: 1440px) {
    height: 55px;
  }

  @media screen and (max-width: 420px) {
    height: 52px;
    background-size: 80% 80%;
  }
`;

export const ConnectWallet = styled.div`
  position: relative;
  display: flex;
  width: 790px;
  height: 440px;
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  @media screen and (max-width: 420px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }
`;

export const Left = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding: 50px 70px;
  border-radius: 8px 0 0 8px;
  background: url('/assets/bg-tg.svg') center/cover no-repeat;

  @media screen and (max-width: 420px) {
    width: 100%;
    padding: 30px 15px;
  }
`;

export const Right = styled.div`
  height: 100%;
  width: 50%;
  background: #FFFFFF;
  padding: 50px 30px;
  border-radius: 0 8px 8px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media screen and (max-width: 420px) {
    width: 100%;
    padding: 30px 15px;
    align-items: center;
  }
`;

export const BackButton = styled.div`
  display: inline-block;
  position: relative;
  font-weight: 700;
  font-size: 13px;
  color: ${COLORS.black};
  padding-left: 19px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    position: absolute;
    content: '';
    width: 9px;
    height: 16px;
    left: 0;
    top: 1px;
    background: url('/assets/arrow-back.svg') center/contain no-repeat;
  }
`;

export const ButtonOpen = styled.button`
  position: relative;
  width: 295.34px;
  height: 33.08px;
  background: linear-gradient(92.25deg, #8F5AE0 -10.04%, #37B9C6 116.12%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: transparent;
  transition: 0.6s;

  span {
    width: 114px;
    height: 19px;
    font-family: 'Gilroy', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;

    color: #FFFFFF;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    border: 1px solid #ffffff;
    background: linear-gradient(to left 92.25deg, #8F5AE0 -3.02%, #37B9C6 147.12%);
    transform: scale(0.95);
  }
`;

export const List = styled.ol`
  color: ${COLORS.black};
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 42px;

  li {
    margin-left: -12px;
  }

`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 265px;
  height: 160.33px;
  box-shadow: 0px 4px 37px rgba(51, 137, 132, 0.3);
  border-radius: 10px;
`;

export const TitleBlock = styled.div`
  h1 {
    width: 259px;
    height: 24px;
    left: 918.67px;
    top: 344.84px;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: #150B4D;
  }
`;

