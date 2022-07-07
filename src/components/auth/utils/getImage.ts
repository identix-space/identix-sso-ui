import axios from 'axios';
import {CAPTCHA_REQUEST_URL} from '../../../constants';

export async function getCaptcha() {
    const responseCaptcha = await axios.get(CAPTCHA_REQUEST_URL);
    if (typeof window !== 'undefined') {
        const img = window.btoa(responseCaptcha.data);
        return {image: img, captchaId: responseCaptcha.headers['captcha-id']};
    }
    return {image: '', captchaId: responseCaptcha.headers['captcha-id']};
}
