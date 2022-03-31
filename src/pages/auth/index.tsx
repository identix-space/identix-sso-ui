import React, {ReactNode} from 'react';
import {useRouter} from 'next/router';

export default function Auth(): ReactNode {

    const router = useRouter();
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <button disabled={true}>Connect with Google</button>
                <button disabled={true}>Connect with FB</button>
                <button disabled={false} onClick={
                    async () => {
                        await router.push({
                            pathname: '/auth/loginWithEmail'
                        });
                    }
                }>Login by email</button>
            </div>
        </div>
    );
}
