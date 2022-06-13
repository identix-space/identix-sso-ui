import React, {ReactNode} from 'react';
import {SignInWith} from '../../components/auth/signIn';
import {ModalAlert} from '../../components/ModalAlert';

export default function Auth(): ReactNode {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <SignInWith/>
                <ModalAlert/>
            </div>
        </div>
    );
}
