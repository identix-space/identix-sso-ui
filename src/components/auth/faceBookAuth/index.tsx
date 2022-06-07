import React, {useEffect} from 'react';
import {useLoginViaFacebookMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateFacebookAuthUrl,
    redirect
} from '../../../utils/misc';
import styled from 'styled-components';
import {Loader} from '../../Loader';
import {AUTH_FB} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';

export const FacebookAuth = (props: { redirectUrl: string }) => {

    const [loginViaFacebookMutation] = useLoginViaFacebookMutation();
    const router = useRouter();
    const [authCode, setAuthCode] = React.useState('');

    useEffect(() => {
        setAuthCode(extractCodeFromUrl(generateAfterWeb2OutServicesUserLogin(router.asPath)));
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
            redirect(`${props.redirectUrl}?token=${authViaFacebookData.data?.loginViaFacebook.token}`);
        } else {
            console.error('Debug: No "authViaFacebookData.data?.loginViaFacebook.token"');
        }
    }

    return (
        <Loader/>
    );
};

export const FacebookAuthUrl = (props: { redirectUrl: string }) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <Button
            onClick={() => {
                redirect(generateFacebookAuthUrl(props.redirectUrl));
                addCarrotTag(AUTH_FB);
            }}/>
    );
};

const Button = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all .1s ease-in;
  background: url('assets/facebook-icon.svg') 49% 53%/40% no-repeat;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  }
`;


