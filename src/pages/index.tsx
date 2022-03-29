import Link from 'next/link';
import React, {ReactNode} from 'react';

export default function IndexPage(): ReactNode {
    return (
        <div>
            <div>
                <Link href={'/client/register/send-code'}>Registration step 1</Link>
            </div>
            <div>
                <Link href={'/client/register/check-code'}>Registration step 2</Link>
            </div>
            <div>
                <Link href={'/client/login'}>Login</Link>
            </div>
            <div>
                <Link href={'/client/dashboard'}>Dashboard</Link>
            </div>
        </div>
    );
}
