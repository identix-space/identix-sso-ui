import React from 'react';
import {useGenerateAuthCodeMutation, useLoginViaGoogleMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {useClientStore} from '../utils';

export const GoogleAuth = () => {

    const [loginViaGoogleMutation] = useLoginViaGoogleMutation();
    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const router = useRouter();
    const {setUserCode, setUserToken, code} = useClientStore();

    // useEffect(() => {
    //     if (typeof router.query.code !== 'string') {
    //         (async () => {
    //             await router.push({
    //                 pathname: '/'
    //             });
    //         })();
    //     }
    // });

    async function loginUserViaGoogle() {
        const authViaGoogleData = await loginViaGoogleMutation({
            variables: {
                code: typeof router.query.code === 'string' ? router.query.code : ''
            }
        });
        if (authViaGoogleData.data?.loginViaGoogle.token) {
            setUserToken(authViaGoogleData.data.loginViaGoogle.token);
            const authCodeData = await generateAuthCodeMutation();
            if (authCodeData.data?.generateAuthCode) {
                setUserCode(authCodeData.data?.generateAuthCode);
            }
            await router.push({
                pathname: `${router.query.callback_url}?code=${code}`
            });
        }
    }

    return (
        <>
            <button onClick={loginUserViaGoogle}>Connect via Google</button>
        </>
    );
};
