import React, {ReactNode, useEffect, useState} from 'react';
import {FacebookAuth} from '../../../components/auth/faceBookAuth';
import {extractRedirectUriFromState} from '../../../utils/misc';

export default function IndexPage(): ReactNode {
    const [redirectUrl, setRedirectUrl] = useState('');
    useEffect(() => {
        setRedirectUrl(extractRedirectUriFromState(window.location.href));
    }, []);

    return (
        <div>
            <FacebookAuth redirectUrl={redirectUrl}/>
        </div>
    );
}
