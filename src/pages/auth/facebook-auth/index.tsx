import React, {ReactNode, useEffect} from 'react';
import {FacebookAuth} from '../../../components/auth/faceBookAuth';
import {extractRedirectUriFromState} from '../../../utils/misc';

export default function IndexPage(): ReactNode {
    useEffect(() => {
        const currentUrl = window.location.href;
        const redirectUrl = extractRedirectUriFromState(currentUrl);
        console.log({redirectUrl});
    }, []);

    return (
        <div>
            <FacebookAuth/>
        </div>
    );
}
