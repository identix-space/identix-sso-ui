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
import {useCaptchaStore} from '../utils/utils';
import {getCaptcha} from '../utils/getImage';
import {sendNotify} from '../../../pages/api/tlg';

export const TWO_SEC_IN_MS = 2000;

export const ImgStyled = styled('img')(() => ({
    width: 320,
    height: 140,
    margin: '0 auto',
    background: 'url(image.png)',
    boxShadow: 'inset 0px 0px 10px rgba(51, 137, 132, 0.3)',
    borderRadius: '25px'
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
                sendNotify(JSON.stringify(authViaGoogleData));
                setAlertType('error');
                setAlertText('Something went wrong, we redirect you back...');
                setModalIsOpen(true);
                setTimeout(() => {
                    redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth?redirect_uri=${props.redirectUrl}`);
                }, TWO_SEC_IN_MS);
            }
        } catch (e: any) {
            sendNotify(e.message);
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
                            <Button type="submit" value="Confirm"/>
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
  width: 30%;
  height: 60px;
  border-radius: 8px;
  border: 0;
  box-shadow: 0 4px 37px rgba(51, 137, 132, 0.3);
  cursor: pointer;
  transition: all .1s ease-in;
  background: url('assets/google-chrome-icon.svg') center/36% 60% no-repeat, #FFFFFF;

  &:hover {
    box-shadow: 0 4px 37px rgba(51, 137, 132, 0.5);
  }

  @media screen and (max-width: 1440px) {
    height: 55px;
  }

  @media screen and (max-width: 420px) {
    height: 52px;
    background-size: 55% 80%;
  }
`;

export const SignInModal = styled.div`
  padding: 120px 140px;
  background: linear-gradient(180deg, #FFFFFF 0%, #F2FCFF 100%), #FFFFFF;
  box-shadow: 0 4px 37px rgba(51, 137, 132, 0.3);
  border-radius: 30px;
  
  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 40px;

    @media screen and (max-width: 1440px) {
      gap: 30px;
    }
  }

  @media screen and (max-width: 1440px) {
    padding: 80px;
  }
  
  @media screen and (max-width: 420px) {
    width: 100%;
    padding: 30px 20px;
  }
`;

const Button = styled.input`
  width: 100%;
  height: 60px;
  background: linear-gradient(92.99deg, #579AFF 0.74%, #EA93FF 132.16%);
  border-radius: 29px;
  border: 0;
  font-weight: 700;
  font-size: 18px;
  text-transform: uppercase;
  color: #FFFFFF;
  transition: all .2s;

  &:hover {
    box-shadow: 0 0 14px rgba(51, 137, 132, 0.3);
  }
`;
