import Link from 'next/link';
import React, {ReactNode} from 'react';
import {EverscaleAuth} from '../components/auth/everscaleAuth';
import {GoogleAuth} from '../components/auth/googleAuth';
import {FacebookAuth} from '../components/auth/faceBookAuth';


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
            <EverscaleAuth/>
            <GoogleAuth/>
            <FacebookAuth/>
        </div>
    );
}
