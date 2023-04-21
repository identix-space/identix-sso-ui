export function redirect(url: string): void {
    if (typeof window !== 'undefined') {
        window.location.href = url;
    }
}

export function generateFacebookAuthUrl(redirectUri: string): string {
    const redirectUriEncoded = encodeURIComponent(redirectUri);
    const basicUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/uaepass-auth`;
    console.log({basicUri});
    const url = `https://stg-id.uaepass.ae/idshub/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_UAEPASS_CLIENT_ID}&scope=urn:uae:digitalid:profile:general&redirect_uri=${basicUri}&acr_values=urn:safelayer:tws:policies:authentication:level:low&state=${redirectUriEncoded}`;
    console.log({UaepassAuthUrl: url});
    return url;
}

export function generateGoogleAuthUrl(redirectUri: string): string {
    const redirectUriEncoded = encodeURIComponent(redirectUri);
    const basicUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/google-auth`;
    // console.log({basicUri});
    // console.log({googleAuthUrl: url});
    return `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${basicUri}&flowName=GeneralOAuthFlow&state=${redirectUriEncoded}`;
}

export function extractRedirectUriFromState(uri: string): string {
    console.log({uri});
    const queryParams = new URLSearchParams(new URL(uri).search);
    const redirectUri = queryParams.get('state');
    if (!redirectUri) {
        throw new Error('Redirect URI not found');
    }
    let res = decodeURIComponent(redirectUri);

    // remove all after #
    const hashIndex = res.indexOf('#');
    if (hashIndex !== -1) {
        res = res.slice(0, hashIndex);
    }
    return res;
}

export function extractRedirectUriFromUrl(url: string, noRedirect?: boolean): string {
    const queryParams = new URLSearchParams(new URL(url).search);
    const redirectUri = queryParams.get('redirect_uri');
    if (!redirectUri && !noRedirect) {
        redirect('/');
        return '';
    } else if (!redirectUri && noRedirect) {
        return '';
    }
    return decodeURIComponent(redirectUri ? redirectUri : '');
}

export function extractCodeFromUrl(url: string): string {
    const queryParams = new URLSearchParams(new URL(url).search);
    const redirectUri = queryParams.get('code');
    if (!redirectUri) {
        return '';
    }
    return decodeURIComponent(redirectUri);
}

export function generateAfterWeb2OutServicesUserLogin(uri: string): string {
    return `${process.env.NEXT_PUBLIC_APP_URL}${uri}`;
}


export function decodeFromBase64(text: string) : string {
    if (typeof window !== undefined) {
        return window.atob(text);
    } else {
        return '';
    }
}

export function encodeToBase64(text: string) : string {
    if (typeof window !== undefined) {
        return window.btoa(text);
    } else {
        return '';
    }
}

export function generateTelegramLink(code: string): string {
    return `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME}?start=${code}`;
}
