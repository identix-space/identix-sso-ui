import React, {useEffect} from 'react';
import {useGenerateAuthCodeMutation, useLoginViaFacebookMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {useClientStore} from '../utils';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServisesUserLogin,
    generateFacebookAuthUrl,
    redirect
} from '../../../utils/misc';

export const FacebookAuth = (props:{redirectUrl: string}) => {

    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const [loginViaFacebookMutation] = useLoginViaFacebookMutation();
    const router = useRouter();
    const {setUserCode, setUserToken, code} = useClientStore();
    const [authCode, setAuthCode] = React.useState('');

    useEffect(() => {
        setAuthCode(extractCodeFromUrl(generateAfterWeb2OutServisesUserLogin(router.asPath)));
        if (authCode !== '') {
            (async () => {
                await loginUserViaFacebook();
            })();
        }
    }, [router]);

    async function loginUserViaFacebook() {
        const authViaFacebookData = await loginViaFacebookMutation({
            variables: {
                code: authCode
            }
        });
        if (authViaFacebookData.data?.loginViaFacebook.token) {
            setUserToken(authViaFacebookData.data.loginViaFacebook.token);
            const authCodeData = await generateAuthCodeMutation();
            if (authCodeData.data?.generateAuthCode) {
                setUserCode(authCodeData.data?.generateAuthCode);
            }
            try {
                redirect(`${props.redirectUrl}?code=${code}`);
            } catch (e) {
                redirect(`${process.env.NEXT_PUBLIC_APP_URL}?code=${code}`);
            }
        }
    }

    return (
        <>
            <button onClick={loginUserViaFacebook}>Enter via Facebook</button>
        </>
    );
};

export const FacebookAuthUrl = (props:{redirectUrl: string}) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <button
            onClick={() => {
                redirect(generateFacebookAuthUrl(props.redirectUrl));
            }}>
            Login via Facebook
        </button>
    );
};
