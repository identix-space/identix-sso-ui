import Link from 'next/link';
import React, {ReactNode} from 'react';
import {generateFacebookAuthUrl, generateGoogleAuthUrl} from '../utils/misc';

export default function IndexPage(): ReactNode {
    return (
        <div>
            <h1>Home page</h1>
            <div>
                <Link href={'/client/register/send-code'}>Connect my site</Link>
            </div>
            <div>
                <Link href={'/client/login'}>Login</Link>
            </div>
            <h1>Authorization via everwallet </h1>
            <p>http://localhost:3000/auth/everLogin?callback_url=https://pass.identix.space/auth</p><br/>
            <h1>Authorization via google <a
                href={generateGoogleAuthUrl()}>click</a>
            </h1>
            <p>After login via google change url to localhost:3000/auth/google-auth?....</p><br/>
            <h1>Authorization via facebook <a
                href={generateFacebookAuthUrl()}>click</a>
            </h1>
            <p>After login via google change url to localhost:3000/auth/facebook-auth?....</p><br/>
        </div>
    );
}
