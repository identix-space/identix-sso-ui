import React, {ReactNode, useEffect, useState} from 'react';
import {EverscaleAuth} from '../../../components/auth/everscaleAuth';
import {extractRedirectUriFromState} from '../../../utils/misc';

export default function IndexPage(): ReactNode {

    const [redirectUrl, setRedirectUrl] = useState('');
    useEffect(() => {
        setRedirectUrl(extractRedirectUriFromState(window.location.href));
    }, []);
    return (
        <div>
            <EverscaleAuth
                redirectUrl={redirectUrl}
            />
        </div>
    );
}
