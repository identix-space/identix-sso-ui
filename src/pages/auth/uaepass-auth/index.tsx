import React, {ReactNode, useEffect, useState} from 'react';
import {UaepassAuth} from '../../../components/auth/uaepassAuth';
import {extractRedirectUriFromState} from '../../../utils/misc';

export default function IndexPage(): ReactNode {
    const [redirectUrl, setRedirectUrl] = useState('');
    useEffect(() => {
        setRedirectUrl(extractRedirectUriFromState(window.location.href));
    }, []);

    return (
        <UaepassAuth redirectUrl={redirectUrl}/>
    );
}
