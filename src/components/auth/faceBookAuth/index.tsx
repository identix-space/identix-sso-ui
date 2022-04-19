import React from 'react';
import {useGenerateAuthCodeMutation, useLoginViaFacebookMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {useClientStore} from '../utils';
import {generateFacebookAuthUrl, redirect} from '../../../utils/misc';

export const FacebookAuth = () => {

    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const [loginViaFacebookMutation] = useLoginViaFacebookMutation();
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

    async function loginUserViaFacebook() {
        const authViaFacebookData = await loginViaFacebookMutation({
            variables: {
                code: typeof router.query.code === 'string' ? router.query.code : ''
            }
        });
        if (authViaFacebookData.data?.loginViaFacebook.token) {
            setUserToken(authViaFacebookData.data.loginViaFacebook.token);
            const authCodeData = await generateAuthCodeMutation();
            if (authCodeData.data?.generateAuthCode) {
                setUserCode(authCodeData.data?.generateAuthCode);
            }
            if (router.query.callback_url) {
                window.location.href = `${router.query.callback_url}?code=${code}`;
            }
        }
    }

    return (
        <>
            <button onClick={loginUserViaFacebook}>Enter via Facebook</button>
        </>
    );
};

export const FacebookAuthUrl = () => {
    return (
        <button
            onClick={() => {
                redirect(generateFacebookAuthUrl());
            }}>
            Login via Facebook
        </button>
    );
};
