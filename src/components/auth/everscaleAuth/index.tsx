import React from 'react';
import {
    useGenerateEverWalletCodeMutation,
    useLoginViaEverWalletMutation
} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import styled from 'styled-components';
// import {COLORS} from '../../../utils/colors';
import {redirect} from '../../../utils/misc';
import ReactTooltip from 'react-tooltip';

export const EverscaleAuth = (props: {redirectUrl: string, hasEverWallet: boolean}) => {

    const [generateEverWalletCodeMutation] = useGenerateEverWalletCodeMutation();
    const [loginViaEverWalletMutation] = useLoginViaEverWalletMutation();
    const router = useRouter();
    console.log(router.query.callback_url);

    async function generateOneTimeCodeForEverWallet(userEverWalletPublicKey: string) {
        if (userEverWalletPublicKey === '') {
            return '';
        }
        const oneTimeCodeData = await generateEverWalletCodeMutation({
            variables: {
                publicKey: userEverWalletPublicKey
            }
        });
        if (typeof oneTimeCodeData.data?.generateEverWalletCode === 'string') {
            return oneTimeCodeData.data?.generateEverWalletCode;
        }
        return '';
    }


    // eslint-disable-next-line complexity,sonarjs/cognitive-complexity
    async function ConnectViaEverscale() {
        const ever = await import('everscale-inpage-provider');
        const inpageProvider = new ever.ProviderRpcClient();
        await inpageProvider.disconnect();
        await inpageProvider.ensureInitialized();
        const {accountInteraction} = await inpageProvider.rawApi.requestPermissions({
            permissions: ['basic', 'accountInteraction']
        });
        const oneTimeCode = await generateOneTimeCodeForEverWallet(accountInteraction?.publicKey ? accountInteraction?.publicKey : '');
        if (oneTimeCode.length > 1) {
            const buff = new Buffer(oneTimeCode);
            const base64data = buff.toString('base64');
            const result = await inpageProvider.rawApi.signData({
                data: base64data, publicKey: String(accountInteraction?.publicKey)
            });
            if (result.signatureHex && accountInteraction?.publicKey) {
                const dataAfterLogin = await loginViaEverWalletMutation({
                    variables: {
                        publicKey: accountInteraction?.publicKey,
                        codeSignatureHex: result.signatureHex
                    }
                });
                if (dataAfterLogin.data?.loginViaEverWallet.token) {
                    try {
                        redirect(`${props.redirectUrl}?token=${dataAfterLogin.data?.loginViaEverWallet.token}`);
                    } catch (e) {
                        redirect(`${process.env.NEXT_PUBLIC_APP_URL}?token=${dataAfterLogin.data?.loginViaEverWallet.token}`);
                    }
                }
            }
        }
    }

    return (
        <>
            <div data-tip="Wallet is not installed. Please, install the wallet and refresh the page." data-tip-disable={props.hasEverWallet}>
                <Button onClick={ConnectViaEverscale} disabled={!props.hasEverWallet}>Connect wallet</Button>
            </div>
            <ReactTooltip backgroundColor="#FFFFFF" textColor="#000000" />
        </>
    );
};

// const SignInButton = styled.button`
//   width: 100%;
//   height: 38px;
//   background: ${COLORS.white};
//   box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 8px;
//   border: 1.5px solid #95F0FF;
//   position: relative;
//   font-weight: 500;
//   font-size: 13px;
//   text-align: left;
//   color: ${COLORS.black};
//   padding-left: 19px;
//   cursor: pointer;
//   transition: all .1s ease-in;
//
//   &:hover {
//     transform: scale(0.98);
//     box-shadow: 0 4px 4px rgba(0, 0, 0, 0.35);
//   }
//
//   &::after {
//     position: absolute;
//     content: '';
//     width: 24px;
//     height: 24px;
//     right: 24px;
//     top: 5px;
//     background: url('/assets/ever-wallet-icon.png') center/contain no-repeat;
//   }
// `;

const Button = styled.button`
  border: 0;
  width: 100%;
  height: 40px;
  font-weight: 700;
  font-size: 15px;
  color: #FFFFFF;
  background: linear-gradient(92.25deg, #8F5AE0 -10.04%, #37B9C6 116.12%);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  cursor: pointer;
  transition: all .1s ease-in;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.35);
  }
  
  &[disabled] {
    pointer-events: none;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(92.25deg, #8F5AE0 -10.04%, #37B9C6 116.12%);
  }
`;
