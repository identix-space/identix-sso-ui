import React from 'react';
import {useGenerateAuthCodeMutation, useLoginViaFacebookMutation} from '../../../generated/graphql';

export const FacebookAuth = () => {

    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const [loginViaFacebookMutation] = useLoginViaFacebookMutation();

    async function generateAuthCodeForFacebook() {
        const codeForFacebookAuthData = await generateAuthCodeMutation();
        console.log(codeForFacebookAuthData);
        if (typeof codeForFacebookAuthData.data?.generateAuthCode === 'string') {
            return codeForFacebookAuthData.data?.generateAuthCode;
        }
        return '';
    }

    async function loginUserViaGoogle() {
        const authCodeForFacebookAuth = await generateAuthCodeForFacebook();
        if (authCodeForFacebookAuth) {
            const authViaFacebookData = loginViaFacebookMutation({
                variables: {
                    code: authCodeForFacebookAuth
                }
            });
            console.log(authViaFacebookData);
        }
    }

    return (
        <>
            <button onClick={loginUserViaGoogle}>Connect via Facebook</button>
            {/*<>{authTokenAfterEverWalletLogin}</>*/}
        </>
    );
};
