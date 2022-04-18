import React from 'react';
import {useGenerateAuthCodeMutation, useLoginViaFacebookMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {useClientStore} from '../utils';

export const FacebookAuth = () => {

    const [generateAuthCodeMutation] = useGenerateAuthCodeMutation();
    const [loginViaFacebookMutation] = useLoginViaFacebookMutation();
    const router = useRouter();
    const {setUserCode, setUserToken, code} = useClientStore();
    const callbackUrl = 'https://pass.identix.space/auth';

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
        }
    }

    return (
        <>
            <button onClick={loginUserViaFacebook}>Connect via Facebook</button>
            {code &&
            <a href={`${callbackUrl}?code=${code}`}>Go to identix.pass</a>
            }
        </>
    );
};
