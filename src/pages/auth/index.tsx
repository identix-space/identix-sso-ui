import React, {ReactNode} from 'react';
import {FaceebookAuthUrl} from '../../components/auth/faceBookAuth';
import {EverscaleAuth} from '../../components/auth/everscaleAuth';
import {GoogleAuthUrl} from '../../components/auth/googleAuth';

export default function Auth(): ReactNode {
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <FaceebookAuthUrl/>
                <EverscaleAuth/>
                <GoogleAuthUrl/>
            </div>
        </div>
    );
}
