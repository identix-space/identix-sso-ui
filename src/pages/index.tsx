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
        </div>
    );
}
