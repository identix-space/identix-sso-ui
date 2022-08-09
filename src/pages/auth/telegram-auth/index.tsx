import React, {ReactNode, useEffect, useState} from 'react';
import {extractRedirectUriFromUrl} from '../../../utils/misc';
import {TelegramAuth} from '../../../components/auth/telegramAuth';

export default function IndexPage(): ReactNode {
    const [redirectUrl, setRedirectUrl] = useState('');
    useEffect(() => {
        setRedirectUrl(extractRedirectUriFromUrl(window.location.href, true));
    }, []);

    return (
        <div>
            <TelegramAuth redirectUrl={redirectUrl}/>
        </div>
    );
}
