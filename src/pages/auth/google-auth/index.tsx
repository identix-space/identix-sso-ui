import React, {ReactNode} from 'react';
import {GoogleAuth} from '../../../components/auth/googleAuth';

export default function IndexPage(): ReactNode {
    return (
        <div>
            <GoogleAuth/>
        </div>
    );
}
