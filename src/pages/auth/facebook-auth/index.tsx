import React, {ReactNode} from 'react';
import {FacebookAuth} from '../../../components/auth/faceBookAuth';

export default function IndexPage(): ReactNode {
    return (
        <div>
            <FacebookAuth/>
        </div>
    );
}
