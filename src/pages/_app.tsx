import {getApolloClient} from '../utils/ApolloClient';
import {ApolloProvider} from '@apollo/client';
import React, {ReactNode, useEffect} from 'react';
import {AppProps} from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/fonts.scss';
import Head from 'next/head';
import Script from 'next/script';
import {
    FACEBOOK_THEME_DEFAULT_VALUE,
    GOOGLE_THEME_DEFAULT_VALUE,
    THEME,
    THEME_HASH_FACEBOOK,
    THEME_HASH_GOOGLE
} from '../constants';

export default function MyApp({Component, pageProps}: AppProps): ReactNode {

    useEffect(() => {
        if (typeof localStorage !== undefined) {
            const google = localStorage.getItem(THEME_HASH_GOOGLE);
            const facebook = localStorage.getItem(THEME_HASH_FACEBOOK);
            if (!google || !facebook) {
                const buffGoogle = new Buffer(GOOGLE_THEME_DEFAULT_VALUE);
                const buffFacebook = new Buffer(FACEBOOK_THEME_DEFAULT_VALUE);
                const base64dataGoogle = buffGoogle.toString('base64');
                const base64dataFacebook = buffFacebook.toString('base64');
                localStorage.setItem(THEME_HASH_GOOGLE, base64dataGoogle);
                localStorage.setItem(THEME_HASH_FACEBOOK, base64dataFacebook);
                localStorage.setItem(THEME, 'light');
            }
        }
    }, []);


    return <ApolloProvider client={getApolloClient}>
        <Head>
            <title>SSO.Identix.Space</title>
        </Head>
        <Script src="/carrotquest.js" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-RHYBBTEX6G" />
        <Script src="/google-analytics.js" />
        <Component {...pageProps} />
    </ApolloProvider>;
}
