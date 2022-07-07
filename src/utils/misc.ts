export function redirect(url: string): void {
    if (typeof window !== 'undefined') {
        window.location.href = url;
    }
}

export function generateFacebookAuthUrl(redirectUri: string): string {
    const redirectUriEncoded = encodeURIComponent(redirectUri);
    const basicUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/facebook-auth`;
    console.log({basicUri});
    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=${basicUri}&state=${redirectUriEncoded}`;
    console.log({facebookAuthUrl: url});
    return url;
}

export function generateGoogleAuthUrl(redirectUri: string): string {
    const redirectUriEncoded = encodeURIComponent(redirectUri);
    const basicUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/google-auth`;
    console.log({basicUri});
    const url = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${basicUri}&flowName=GeneralOAuthFlow&state=${redirectUriEncoded}`;
    console.log({googleAuthUrl: url});
    return url;
}

export function extractRedirectUriFromState(uri: string): string {
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

export function extractRedirectUriFromUrl(url: string): string {
    const queryParams = new URLSearchParams(new URL(url).search);
    const redirectUri = queryParams.get('redirect_uri');
    if (!redirectUri) {
        redirect('/');
        return '';
    }
    return decodeURIComponent(redirectUri);
}

export function extractCodeFromUrl(url: string): string {
    const queryParams = new URLSearchParams(new URL(url).search);
    const redirectUri = queryParams.get('code');
    if (!redirectUri) {
        throw new Error('Code not found');
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
