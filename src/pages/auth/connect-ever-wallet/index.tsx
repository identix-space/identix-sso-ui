import React, {ReactNode} from 'react';
// import {extractRedirectUriFromState} from '../../../utils/misc';
import {EverWalletConnect} from '../../../components/auth/everWalletConnect';

export default function ConnectEverWalletPage(): ReactNode {
    // const [redirectUrl, setRedirectUrl] = useState('');
    // useEffect(() => {
    //     setRedirectUrl(extractRedirectUriFromState(window.location.href));
    // }, []);

    return (
        <EverWalletConnect/>
    );
}
