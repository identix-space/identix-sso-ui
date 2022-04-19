import React from 'react';
import {
    useGenerateAuthCodeMutation,
    useGenerateEverWalletCodeMutation,
    useLoginViaEverWalletMutation
} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {useClientStore} from '../utils';

export const EverscaleAuth = () => {

    const [generateEverWalletCodeMutation] = useGenerateEverWalletCodeMutation();
    const [loginViaEverWalletMutation] = useLoginViaEverWalletMutation();
    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const {setUserCode, setUserToken, code} = useClientStore();
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
                    setUserToken(dataAfterLogin.data?.loginViaEverWallet.token);
                    const authCodeData = await generateAuthCodeMutation();
                    if (authCodeData.data?.generateAuthCode) {
                        setUserCode(authCodeData.data?.generateAuthCode);
                    }
                    if (router.query.callback_url) {
                        window.location.href = `${router.query.callback_url}?code=${code}`;
                    }
                }
            }
        }
    }

    return (
        <>
            <button onClick={ConnectViaEverscale}>Connect via Ever Wallet</button>
        </>
    );
};
