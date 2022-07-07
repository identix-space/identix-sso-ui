import create from 'zustand';

interface ICaptcha {
    captchaSolution: string;
    captchaId: string;
    setCaptchaSolution: (captchaSolution: string) => void;
    setCaptchaId: (captchaId: string) => void;
}

export const useCaptchaStore = create<ICaptcha>(
    (set) => ({
        // initial state
        captchaSolution: '',
        captchaId: '',
        // methods for manipulating state
        setCaptchaSolution: (captchaSolution: string) => {
            set((state) => ({
                captchaSolution: state.captchaSolution = captchaSolution
            }));
        },
        setCaptchaId: (captchaId: string) => {
            set((state) => ({
                captchaId: state.captchaId = captchaId
            }));
        }
    })
);
