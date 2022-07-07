import React, {useEffect, useMemo} from 'react';
import {useLoginViaFacebookMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    AuthType, decodeFromBase64,
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateFacebookAuthUrl,
    redirect, saveAuthorizationFact
} from '../../../utils/misc';
import styled from 'styled-components';
import {Loader} from '../../Loader';
import {AUTH_FB} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';
import {ImgStyled, SignInModal, TWO_SEC_IN_MS} from '../googleAuth';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useCaptchaStore} from '../utils/utils';
import {getCaptcha} from '../utils/getImage';


export const FacebookAuth = (props: { redirectUrl: string }) => {

    const {setCaptchaSolution, setCaptchaId, captchaId, captchaSolution} = useCaptchaStore();
    const [loginViaFacebookMutation] = useLoginViaFacebookMutation({
        context: {
            headers: {
                'captcha-solution': captchaSolution,
                'captcha-id': captchaId
            }
        }
    });
    const {setModalIsOpen, setAlertText, setAlertType} = useModalAlertSettings();
    const router = useRouter();
    const [captcha, setCaptcha] = React.useState(false);
    const [authCode, setAuthCode] = React.useState('');
    const [imgSrc, setImgSrc] = React.useState<string>('');

    useEffect(() => {
        (async () => {
            setAuthCode(extractCodeFromUrl(generateAfterWeb2OutServicesUserLogin(router.asPath)));
        })();
    }, [router]);

    useMemo(() => {
        (async () => {
            if (!captchaId || !imgSrc) {
                const res = await getCaptcha();
                setImgSrc(res.image);
                setCaptchaId(res.captchaId);
            }
        })();
    }, []);

    async function click() {
        const solution = (document.getElementById('captchaSolution') as HTMLInputElement)?.value;
        if (solution !== '') {
            await setCaptchaSolution(solution);
            await setCaptcha(true);
            if (authCode !== '') {
                await loginUserViaFacebook();
            }
        }
    }

    async function loginUserViaFacebook() {
        try {
            const authViaFacebookData = await loginViaFacebookMutation({
                variables: {
                    code: authCode
                }
            });
            const facebookHash = localStorage.getItem(THEME_HASH_FACEBOOK);
            if (typeof window !== undefined && facebookHash) {
                const facebookId = window.atob(facebookHash);
                const isSameFacebookID = FACEBOOK_THEME_DEFAULT_VALUE === decodeFromBase64(facebookHash) ? true : authViaFacebookData.data?.loginViaFacebook.account.id === Number(facebookId);
                if (isSameFacebookID) {
                    if (authViaFacebookData.data?.loginViaFacebook.token) {
                        setAlertType('success');
                        setAlertText('Everything is fine. Redirecting you...');
                        setModalIsOpen(true);
                        saveAuthorizationFact(AuthType.FACEBOOK, authViaFacebookData.data?.loginViaFacebook.account.id);
                        redirect(`${props.redirectUrl}?token=${authViaFacebookData.data?.loginViaFacebook.token}`);
                    }
                } else {
                    setAlertType('success');
                    setAlertText('Everything is fine. Redirecting you...');
                    setModalIsOpen(true);
                    setTimeout(() => {
                        redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                    }, TWO_SEC_IN_MS);
                }
            }
        } catch (e) {
            console.log(e);
            setAlertType('error');
            setAlertText('Something went wrong, we redirect you back...');
            setModalIsOpen(true);
            setTimeout(() => {
                redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
            }, TWO_SEC_IN_MS);
        }
    }


    return (
        <>
            {captcha
                ? <><Loader/></>
                : <SignInModal>
                    <ImgStyled src={`data:image/svg+xml;base64, ${imgSrc}`} alt="Captcha"/>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Enter solution" placeholder="Ex.: 15" id="captchaSolution" color="secondary"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button size="large" type="submit" variant="contained" color="secondary" sx={{width: '100%'}} onClick={() => click()}>
                            Confirm
                        </Button>
                    </Grid>
                </SignInModal>
            }
            <ModalAlert/>
        </>
    );
};

export const FacebookAuthUrl = (props: { redirectUrl: string }) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <ButtonSocial
            onClick={() => {
                redirect(generateFacebookAuthUrl(props.redirectUrl));
                addCarrotTag(AUTH_FB);
            }}/>
    );
};

const ButtonSocial = styled.button`
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


