import React, {FC} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {Col, Row} from 'react-bootstrap';
import {Body3, Title3, Label1} from './Texts';
import {COLORS} from '../utils/colors';
import {FacebookAuthUrl} from './auth/faceBookAuth';
import {GoogleAuthUrl} from './auth/googleAuth';
import {EverscaleAuth} from './auth/everscaleAuth';
import {extractRedirectUriFromUrl} from '../utils/misc';

type ButtonProps = {
    icon?: string;
    color?: string;
}

export const SignInWith: FC = () => {
    const router = useRouter();

    return (
        <SignInModal>
            <Row class="row h-100">
                <Col md={6}>
                    <BackButton onClick={() => router.back()}>Back</BackButton>
                    <Body3WithStar marginXl="50px 0 0">
                        Your first step to Web3. Use a decentralized identifier for authentication and be sure that your
                        identity is now self-sovereign. No more centralization - only full control in your hands and
                        maximum data safety.<br/><br/>
                        The familiar authentication methods from web2. We will still create a decentralized identifier
                        for you, and you can take full control of it whenever you want.
                    </Body3WithStar>
                </Col>
                <Col class="d-flex flex-column justify-content-start col-md-6">
                    <Title3 textAlign="center">Sign In with <u>Identix.PASS</u></Title3>
                    <ButtonsWrapper>
                        <EverscaleAuth/>
                        <SignInButton disabled icon="/assets/metamask-icon.png">Metamask (Ethereum)</SignInButton>
                        <SignInButton disabled>I know my DID</SignInButton>
                    </ButtonsWrapper>
                    <Label1 color="#9E9E9E" textAlign="center" marginXl="15px 0 10px">or</Label1>
                    <SocialButtonsWrapper>
                        <GoogleAuthUrl
                            redirectUrl={extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`)}
                        />
                        <FacebookAuthUrl
                            redirectUrl={extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`)}
                        />
                    </SocialButtonsWrapper>
                </Col>
            </Row>
        </SignInModal>);
};

const SignInModal = styled.div`
  height: 440px;
  width: 790px;
  background: #FFFFFF;
  padding: 50px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const Body3WithStar = styled(Body3)`
  position: relative;
  padding-left: 30px;
  padding-right: 15px;

  &::after {
    position: absolute;
    content: '';
    width: 14px;
    height: 14px;
    left: 0;
    top: 1px;
    background: url('/assets/star-blue.svg') center/contain no-repeat;
  }
`;

const BackButton = styled.div`
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

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 45px;
  height: 136px;
`;

const SignInButton = styled.button<ButtonProps>`
  width: 100%;
  height: 38px;
  background: ${(props) => (props.color ? props.color : `${COLORS.white}`)};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 1.5px solid #95F0FF;
  position: relative;
  font-weight: 500;
  font-size: 13px;
  text-align: left;
  color: ${(props) => (props.color ? `${COLORS.white}` : `${COLORS.black}`)};
  padding-left: 19px;
  cursor: pointer;
  transition: all .1s ease-in;

  &:hover {
    transform: scale(0.98);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.35);
  }

  &::after {
    position: absolute;
    content: '';
    width: 24px;
    height: 24px;
    right: 24px;
    top: 5px;
    background: url(${(props) => (props.icon ? props.icon : '')}) center/contain no-repeat;
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
`;

const SocialButtonsWrapper = styled.div`
  width: 100px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
