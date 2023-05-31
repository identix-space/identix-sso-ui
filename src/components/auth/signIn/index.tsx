import React, {FC} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Title1} from '../../Texts';
import {COLORS} from '../../../utils/colors';
import {UaeAuthUrl} from '../uaepassAuth';
import {extractRedirectUriFromUrl} from '../../../utils/misc';

type ButtonProps = {
    icon?: string;
    color?: string;
}

export const SignInWith: FC = () => {
    const router = useRouter();
    // const [isPass, setIsPass] = useState<boolean>(false);
    // const passUrls = ['https://pass-dev.identix.space/', 'https://pass-stage.identix.space/', 'https://pass.identix.space/'];
    // useEffect(() => {
    //     const redirectUrl = extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`);
    //     if (passUrls.includes(redirectUrl)) {
    //         setIsPass(true);
    //     }
    // }, [router]);


    return (
        <SignInModal>
            <Title1 textAlign="center">Sign In with <span>Identix</span></Title1>
            {/*{isPass*/}
            {/*    ? <>*/}
            <ButtonsWrapper>
                <UaeAuthUrl redirectUrl={extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`)}/>
                <SignInButton disabled icon="/assets/logo-venom.svg">Venom Wallet</SignInButton>
            </ButtonsWrapper>
            {/*<Label1WithLines>Or</Label1WithLines>*/}
            {/*    </>*/}
            {/*    : <></>*/}
            {/*}*/}
            {/*{!isPass &&*/}
            {/*<SignInPic/>*/}
            {/*}*/}
            {/*<SocialButtonsWrapper>*/}
            {/*</SocialButtonsWrapper>*/}
        </SignInModal>);
};

export const SignInModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 615px;
  padding: 76px 70px 108px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F2FCFF 100%);
  box-shadow: 0px 4px 37px rgba(51, 137, 132, 0.3);
  border-radius: 30px;

  @media screen and (max-width: 1440px) {
    width: 540px;
    padding: 58px 50px 82px;
  }
  
  @media screen and (max-width: 600px) {
    background: none;
    border: 0;
    box-shadow: unset;
    width: 100%;
    height: auto;
    padding: 0;
    margin-bottom: 15px;
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
    width: 34px;
    height: 34px;
    right: 33px;
    top: 14px;
    background: url(${(props) => (props.icon ? props.icon : '')}) center/contain no-repeat;

    @media screen and (max-width: 1440px) {
      top: 12px;
      right: 27px;
      width: 30px;
      height: 30px;
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

