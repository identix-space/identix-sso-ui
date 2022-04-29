import React, {ReactNode, useEffect} from 'react';
// import {extractRedirectUriFromState} from '../../../utils/misc';
import {EverWalletConnect} from '../../../components/auth/everWalletConnect';
import {useRouter} from 'next/router';

export default function ConnectEverWalletPage(): ReactNode {
    // const [redirectUrl, setRedirectUrl] = useState('');
    const router = useRouter();
    useEffect(() => {
        router.back();
    }, []);

    return (
        <EverWalletConnect/>
    );
}
