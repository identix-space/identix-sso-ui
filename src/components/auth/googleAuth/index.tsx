import React, {useEffect, useMemo} from 'react';
import {useLoginViaGoogleMutation} from '../../../generated/graphql';
import {useRouter} from 'next/router';
import {
    extractCodeFromUrl,
    generateAfterWeb2OutServicesUserLogin,
    generateGoogleAuthUrl,
    redirect
} from '../../../utils/misc';
import styled from 'styled-components';
import {Loader} from '../../Loader';
import {AUTH_GOOGLE} from '../../../constants/carrotTags';
import {addCarrotTag} from '../../../../public/carrottags';
import {ModalAlert, useModalAlertSettings} from '../../ModalAlert';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useCaptchaStore} from '../utils/utils';
import {getCaptcha} from '../utils/getImage';

export const TWO_SEC_IN_MS = 2000;

export const ImgStyled = styled('img')(() => ({
    width: 320,
    height: 110
}));


export const GoogleAuth = (props: { redirectUrl: string }) => {

    const {setCaptchaSolution, setCaptchaId, captchaId, captchaSolution} = useCaptchaStore();
    const [loginViaGoogleMutation] = useLoginViaGoogleMutation({
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


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const solution = (document.getElementById('captchaSolution') as HTMLInputElement)?.value;
        if (solution !== '') {
            await setCaptchaSolution(solution);
            await setCaptcha(true);
            if (authCode !== '') {
                await loginUserViaGoogle();
            }
        }
    }

    async function loginUserViaGoogle() {
        try {
            const authViaGoogleData = await loginViaGoogleMutation({
                variables: {
                    code: authCode
                }
            });
            if (authViaGoogleData.data?.loginViaGoogle.token) {
                setAlertType('success');
                setAlertText('Everything is fine. Redirecting you...');
                setModalIsOpen(true);
                redirect(`${props.redirectUrl}?token=${authViaGoogleData.data.loginViaGoogle.token}`);
            } else {
                setAlertType('error');
                setAlertText('Something went wrong, we redirect you back...');
                setModalIsOpen(true);
                setTimeout(() => {
                    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                }, TWO_SEC_IN_MS);
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
                    <form onSubmit={handleSubmit}>
                        <ImgStyled src={`data:image/svg+xml;base64, ${imgSrc}`} alt="Captcha"/>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Enter solution" placeholder="Ex.: 15" id="captchaSolution" color="secondary"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button size="large" type="submit" variant="contained" color="secondary" sx={{width: '100%'}}>
                                Confirm
                            </Button>
                        </Grid>
                    </form>
                </SignInModal>
            }
            <ModalAlert/>
        </>
    );
};

export const GoogleAuthUrl = (props: { redirectUrl: string }) => {
    if (props.redirectUrl === '') {
        (async () => {
            redirect('/');
        })();
    }
    return (
        <ButtonSocial
            onClick={() => {
                redirect(generateGoogleAuthUrl(props.redirectUrl));
                addCarrotTag(AUTH_GOOGLE);
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
  background: url('assets/google-chrome-icon.svg') 45% 56%/86% no-repeat;

  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
  }
`;

export const SignInModal = styled.div`
  height: 400px;
  width: 450px;
  background: #FFFFFF;
  padding: 50px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  
  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  @media screen and (max-width: 420px) {
    width: 100%;
    padding: 30px 20px;
  }
`;
