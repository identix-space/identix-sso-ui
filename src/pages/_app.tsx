import {getApolloClient} from '../utils/ApolloClient';
import {ApolloProvider} from '@apollo/client';
import React, {ReactNode} from 'react';
import {AppProps} from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/fonts.scss';
import Head from 'next/head';

export default function MyApp({Component, pageProps}: AppProps): ReactNode {
    return <ApolloProvider client={getApolloClient}>
        <Head>
            <script async type="text/javascript" src="/carrotquest.js"></script>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-RHYBBTEX6G"></script>
            <script defer type="text/javascript" src="/google-analytics.js"></script>
        </Head>
        <Component {...pageProps} />
    </ApolloProvider>;
}
