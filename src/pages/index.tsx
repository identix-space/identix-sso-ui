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
            <p>Authorization via everwallet http://localhost:3000/auth/everLogin?callback_url=https://pass.identix.space/auth</p>
        </div>
    );
}
