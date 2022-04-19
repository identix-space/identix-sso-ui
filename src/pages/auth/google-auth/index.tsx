import React, {ReactNode, useEffect} from 'react';
import {GoogleAuth} from '../../../components/auth/googleAuth';
import {extractRedirectUri} from '../../../utils/misc';

export default function IndexPage(): ReactNode {
    useEffect(() => {
        const currentUrl = window.location.href;
        const redirectUrl = extractRedirectUri(currentUrl);
        console.log({redirectUrl});
    }, []);

    return (
        <div>
            <GoogleAuth/>
        </div>
    );
}
