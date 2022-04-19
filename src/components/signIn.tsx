import React, {FC} from 'react';
import styled from 'styled-components';
import {Col, Row} from 'react-bootstrap';
import {Body3, Title3} from './Texts';
import {COLORS} from '../utils/colors';

type ButtonProps = {
    icon?: string;
    color?: string;
}

export const SignInWith: FC = () => {
    return (
        <SignInModal>
            <Row class="row h-100">
                <Col md={6}>
                    <BackButton>Back</BackButton>
                    <Body3WithStar marginXl="50px 0 0">
                        Your first step to Web3. Use a decentralized identifier for authentication and be sure that your
                        identity is now self-sovereign. No more centralization - only full control in your hands and
                        maximum data safety.<br/><br/>
                        The familiar authentication methods from web2. We will still create a decentralized identifier
                        for you, and you can take full control of it whenever you want.
                    </Body3WithStar>
                </Col>
                <Col class="d-flex flex-column justify-content-between col-md-6">
                    <Title3 textAlign="center">Sign In with <u>Identix.PASS</u></Title3>
                    <SignInButton icon="/assets/metamask-icon.png">Metamask (Ethereum)</SignInButton>
                    <SignInButton icon="/assets/ever-wallet-icon.png">Ever wallet</SignInButton>
                    <SignInButton>I know my DID</SignInButton>
                    <SignInButton icon="/assets/google-chrome-icon.svg">Log in via Google</SignInButton>
                    <SignInButton icon="/assets/twitter-icon.svg" color="#1DA1F2">Log in via Twitter</SignInButton>
                    <SignInButton icon="/assets/facebook-icon.svg" color="#3B5998">Log in via Facebook</SignInButton>
                </Col>
            </Row>
        </SignInModal>);
};

const SignInModal = styled.div`
  height: 440px;
  width: 750px;
  background: #FFFFFF;
  padding: 50px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const Body3WithStar = styled(Body3)`
  position: relative;
  padding-left: 30px;

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

const SignInButton = styled.button<ButtonProps>`
  width: 100%;
  height: 40px;
  background: ${(props) => (props.color ? props.color : `${COLORS.white}`)};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
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
    width: 25px;
    height: 25px;
    right: 24px;
    top: 7px;
    background: url(${(props) => (props.icon ? props.icon : '')}) center/contain no-repeat;
  }
`;
