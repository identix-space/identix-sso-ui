import Link from 'next/link';
import React, {ReactNode} from 'react';

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
            <h1>Authorization via everwallet </h1><p>http://localhost:3000/auth/everLogin?callback_url=https://pass.identix.space/auth</p><br></br>
            <h1>Authorization via google <a href={'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https://www.googleapis.com/auth/userinfo.profile&response_type=code&client_id=949996890714-ahkgdivn24qnvbec10f7p5re6ia1e417.apps.googleusercontent.com&redirect_uri=http://local.com/google-auth&flowName=GeneralOAuthFlow'}>click</a></h1>
            <p>After login via google change url to localhost:3000/auth/google-auth?....</p><br></br>
            <h1>Authorization via facebook <a href={'https://www.facebook.com/v13.0/dialog/oauth?client_id=1724654107894999&redirect_uri=https://example.com&state=state'}>click</a></h1>
            <p>After login via google change url to localhost:3000/auth/facebook-auth?....</p><br></br>
        </div>
    );
}
