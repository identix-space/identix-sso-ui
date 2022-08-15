import React, {ReactNode} from 'react';
import {SignInWith} from '../../components/auth/signIn';
import {ModalAlert} from '../../components/ModalAlert';

export default function Auth(): ReactNode {

    return (
        <>
            <SignInWith/>
            <ModalAlert/>
        </>
    );
}
