import React from 'react';
import {useGenerateAuthCodeMutation, useLoginViaGoogleMutation} from '../../../generated/graphql';

export const GoogleAuth = () => {

    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const [loginViaGoogleMutation] = useLoginViaGoogleMutation();

    async function generateAuthCodeForGoogle() {
        const codeForGoogleAuthData = await generateAuthCodeMutation();
        console.log(codeForGoogleAuthData);
        if (typeof codeForGoogleAuthData.data?.generateAuthCode === 'string') {
            return codeForGoogleAuthData.data?.generateAuthCode;
        }
        return '';
    }

    async function loginUserViaGoogle() {
        const authCodeForGoogleAuth = await generateAuthCodeForGoogle();
        if (authCodeForGoogleAuth) {
            const authViaGoogleData = loginViaGoogleMutation({
                variables: {
                    code: authCodeForGoogleAuth
                }
            });
            console.log(authViaGoogleData);
        }
    }

    return (
        <>
            <button onClick={loginUserViaGoogle}>Connect via Google</button>
            {/*<>{authTokenAfterEverWalletLogin}</>*/}
        </>
    );
};
