import React, {ReactNode, useEffect, useState} from 'react';
import {GoogleAuth} from '../../../components/auth/googleAuth';
import {extractRedirectUriFromState} from '../../../utils/misc';

export default function IndexPage(): ReactNode {
    const [redirectUrl, setRedirectUrl] = useState('');
    useEffect(() => {
        setRedirectUrl(extractRedirectUriFromState(window.location.href));
    }, []);


    return (
        <div>
            <p>Redirect url: <a href={redirectUrl}>{redirectUrl}</a></p>
            <br/>
            <GoogleAuth
                redirectUrl={redirectUrl}/>
        </div>
    );
}
