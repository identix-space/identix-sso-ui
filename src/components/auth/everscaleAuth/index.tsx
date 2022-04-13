import React, {useEffect, useState} from 'react';
import {useGenerateEverWalletCodeMutation, useLoginViaEverWalletMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';

export const EverscaleAuth = () => {

    const [generateEverWalletCodeMutation] = useGenerateEverWalletCodeMutation();
    const [loginViaEverWalletMutation] = useLoginViaEverWalletMutation();
    const [authTokenAfterEverWalletLogin, setAuthTokenAfterEverWalletlogin] = useState<string>('');
    // const [redirectUrl, setRedirecturl] = useState<string>('');
    const router = useRouter();
    useEffect(() => {
        if (typeof router.query.callback_url !== 'string') {
            (async () => {
                await router.push({
                    pathname: '/'
                });
            })();
        }
    });

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
            console.log(result);
            if (result.signatureHex && accountInteraction?.publicKey) {
                const dataAfterLogin = await loginViaEverWalletMutation({
                    variables: {
                        publicKey: accountInteraction?.publicKey,
                        codeSignatureHex: result.signatureHex
                    }
                });
                if (dataAfterLogin.data?.loginViaEverWallet.token) {
                    console.log(dataAfterLogin);
                    setAuthTokenAfterEverWalletlogin(dataAfterLogin.data?.loginViaEverWallet.token);
                }
            }
        }
    }

    return (
        <>
            <button onClick={ConnectViaEverscale}>Connect via Ever Wallet</button>
            {authTokenAfterEverWalletLogin &&
                <a href={`${router.query.callback_url}?code=${authTokenAfterEverWalletLogin}`}>Go to identix.pass</a>
            }
        </>
    );
};
