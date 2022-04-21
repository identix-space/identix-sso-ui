import styled from 'styled-components';
import {COLORS} from '../../../utils/colors';
import {Body1, Title1} from '../../Texts';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {extractRedirectUriFromUrl} from '../../../utils/misc';
import {EverscaleAuth} from '../everscaleAuth';

export const EverWalletConnect = () => {

    const router = useRouter();
    //const [redirectUrl, setRedirectUrl] = useState('');
    const [hasEverWallet, setHasEverWallet] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //setRedirectUrl(extractRedirectUriFromState(window.location.href));
        checkIfEverWalletIsInstalled().catch(e => {
            setHasEverWallet(false);
            setLoading(false);
            console.log(e);
        });
    }, []);

    async function checkIfEverWalletIsInstalled() {
        const ever = await import('everscale-inpage-provider');
        const inpageProvider = new ever.ProviderRpcClient();
        if (!(await inpageProvider.hasProvider())) {
            throw new Error('Extension is not installed');
        } else {
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? <Loader>Processing....</Loader>
                : <ConnectWallet>
                    <Left>
                        <BackButton onClick={() => router.back()}>Back</BackButton>
                        <Body1 fontWeight="700" color="#FFFFFF" marginXl="45px 0 0 25px">Don’t have EVER Wallet?</Body1>
                        <List>
                            <li>Go to <u><b>Chrome Web Store</b></u>.</li>
                            <li>Download and install the extension.</li>
                            <li>Select wallet type (SafeMultisig).</li>
                            <li>Save and confirm you seed phrase. Set password.</li>
                            <li>Deploy your wallet.</li>
                        </List>
                    </Left>
                    <Right>
                        <Title1>Connect Wallet</Title1>
                        <ImageWrapper>
                            <Image src="/assets/ever-wallet.png" layout="fill" objectFit="contain"/>
                        </ImageWrapper>
                        <EverscaleAuth hasEverWallet={hasEverWallet} redirectUrl={extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`)}
                        />
                    </Right>
                </ConnectWallet>
            }
        </>
    );
};

const ConnectWallet = styled.div`
  position: relative;
  display: flex;
  height: 450px;
  width: 790px;
  background: #FFFFFF;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const Left = styled.div`
  position: relative;
  height: 100%;
  width: 50%;
  background: rgba(115, 121, 216, 0.92);
  padding: 50px 40px;
  border-radius: 8px 0 0 8px;
  
  
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    bottom: 55px;
    left: 40px;
    background: url('/assets/corner-icon.svg') center/contain no-repeat;
  }

  &::before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    top: 117px;
    right: 40px;
    transform: rotate(180deg);
    background: url('/assets/corner-icon.svg') center/contain no-repeat;
  }
`;

const Right = styled.div`
  height: 100%;
  width: 50%;
  background: #FFFFFF;
  padding: 50px 30px;
  border-radius: 0 8px 8px 0;
`;

const BackButton = styled.div`
  display: inline-block;
  position: relative;
  font-weight: 700;
  font-size: 13px;
  color: ${COLORS.white};
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
    background: url('/assets/arrow-back-white.svg') center/contain no-repeat;
  }
`;

const List = styled.ol`
  color: ${COLORS.white};
  font-size: 14px;
  margin-top: 20px;
  margin-left: 8px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 335px;
  height: 220px;
  margin: 30px 0;
`;

const Loader = styled.p`
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 80px;
`;
