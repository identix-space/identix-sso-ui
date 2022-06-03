import {getApolloClient} from '../utils/ApolloClient';
import {ApolloProvider} from '@apollo/client';
import React, {ReactNode} from 'react';
import {AppProps} from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/fonts.scss';
import Head from 'next/head';
import Script from 'next/script';

export default function MyApp({Component, pageProps}: AppProps): ReactNode {
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
