import React, {ReactNode} from 'react';
import {FacebookAuth} from '../../components/auth/faceBookAuth';
import {EverscaleAuth} from '../../components/auth/everscaleAuth';
import {GoogleAuth} from '../../components/auth/googleAuth';

export default function Auth(): ReactNode {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <FacebookAuth/>
                <EverscaleAuth/>
                <GoogleAuth/>
            </div>
        </div>
    );
}
