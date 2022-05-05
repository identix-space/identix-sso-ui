import React, {ReactNode, useEffect} from 'react';
// import {extractRedirectUriFromState} from '../../../utils/misc';
import {EverWalletConnect} from '../../../components/auth/everWalletConnect';
import {useRouter} from 'next/router';
import {extractRedirectUriFromUrl, redirect} from '../../../utils/misc';

export default function ConnectEverWalletPage(): ReactNode {
    // const [redirectUrl, setRedirectUrl] = useState('');
    const router = useRouter();
    const passUrls = ['https://pass-dev.identix.space', 'https://pass-stage.identix.space', 'https://pass.identix.space'];
    useEffect(() => {
        const redirectUrl = extractRedirectUriFromUrl(`${process.env.NEXT_PUBLIC_APP_URL}${router.asPath}`);
        if (!passUrls.includes(redirectUrl)) {
            redirect('/');
        }
    }, [router]);
    return (
        <EverWalletConnect/>
    );
}
