import React, {ReactNode} from 'react';
import {FacebookAuthUrl} from '../../components/auth/faceBookAuth';
import {EverscaleAuth} from '../../components/auth/everscaleAuth';
import {GoogleAuthUrl} from '../../components/auth/googleAuth';
import {extractRedirectUriFromUrl} from '../../utils/misc';
import {useRouter} from 'next/router';

export default function Auth(): ReactNode {

    const router = useRouter();
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>

                <FacebookAuthUrl
                    redirectUrl={extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`)}
                />
                <EverscaleAuth/>
                <GoogleAuthUrl
                    redirectUrl={extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`)}
                />
            </div>
        </div>
    );
}
