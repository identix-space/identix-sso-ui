import React, {FC, useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Title1, Label1} from '../../Texts';
import {COLORS} from '../../../utils/colors';
import {UaeAuthUrl} from '../uaepassAuth';
import {extractRedirectUriFromUrl} from '../../../utils/misc';

type ButtonProps = {
    icon?: string;
    color?: string;
}

export const SignInWith: FC = () => {
    const router = useRouter();
    const [isPass, setIsPass] = useState<boolean>(false);
    const passUrls = ['https://pass-dev.identix.space/', 'https://pass-stage.identix.space/', 'https://pass.identix.space/'];
    useEffect(() => {
        const redirectUrl = extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`);
        if (passUrls.includes(redirectUrl)) {
            setIsPass(true);
        }
    }, [router]);


    return (
        <SignInModal>
            <Title1 textAlign="center">Sign In with <span>Identix</span></Title1>
            {isPass
                ? <>
                    <ButtonsWrapper>
                        <SignInButton disabled icon="/assets/metamask.svg">Metamask (Ethereum)</SignInButton>
                        <Link passHref href={`/auth/connect-ever-wallet?redirect_uri=${extractRedirectUriFromUrl(
                            `${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`
                        )}`}>
                            <SignInButton icon="/assets/ever-wallet-icon.png">Ever wallet</SignInButton>
                        </Link>
                        <SignInButton disabled>I know my DID</SignInButton>
                    </ButtonsWrapper>
                    <Label1WithLines>Or</Label1WithLines></>
                : <></>
            }
            {!isPass &&
            <SignInPic/>
            }
            <SocialButtonsWrapper>
                <UaeAuthUrl
                    redirectUrl={extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`)}
                />
            </SocialButtonsWrapper>
        </SignInModal>);
};

export const SignInModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 622px;
  width: 615px;
  padding: 76px 100px 128px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F2FCFF 100%);
  box-shadow: 0px 4px 37px rgba(51, 137, 132, 0.3);
  border-radius: 30px;

  @media screen and (max-width: 1440px) {
    height: 512px;
    width: 504px;
    padding: 48px 75px 90px;
  }
  
  @media screen and (max-width: 420px) {
    background: none;
    border: 0;
    box-shadow: unset;
    width: 100%;
    height: auto;
    padding: 0;
  }
`;

const SignInPic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px; 
  height: 310px;
  background: url('/assets/signin_pic.svg') center/contain no-repeat;

  @media screen and (max-width: 420px) {
    width: 100%;
    height: 420px;
    background: url('/assets/signin_pic_mob.svg') center/contain no-repeat;
    
    img {
      width: 100%;
    }
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;
  margin-top: 36px;

  @media screen and (max-width: 1440px) {
    gap: 20px;
    margin-top: 28px;
  }
`;

const SignInButton = styled.button<ButtonProps>`
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

const Label1WithLines = styled(Label1)`
  width: 100%;
  position: relative;
  text-align: center;
  font-size: 16px;
  color: #615A85;

  &::before {
    position: absolute;
    content: '';
    left: 0;
    top: 12px;
    width: calc(50% - 18px);
    height: 1px;
    background: rgba(56, 137, 151, 0.3);

    @media screen and (max-width: 1440px) {
      top: 10px;
    }
  }

  &::after {
    position: absolute;
    content: '';
    right: 0;
    top: 12px;
    width: calc(50% - 18px);
    height: 1px;
    background: rgba(56, 137, 151, 0.3);

    @media screen and (max-width: 1440px) {
      top: 10px;
    }
  }

  @media screen and (max-width: 1440px) {
    font-size: 14px;
  }
`;

const SocialButtonsWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
