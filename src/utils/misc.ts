export function redirect(url: string): void {
    if (typeof window !== 'undefined') {
        window.location.href = url;
    }
}

export function generateFacebookAuthUrl(): string {
    return `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/auth/facebook-auth&state=state${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/auth/google-auth&flowName=GeneralOAuthFlow`;
}

export function generateGoogleAuthUrl(): string {
    return `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/auth/google-auth&flowName=GeneralOAuthFlow`;
}
