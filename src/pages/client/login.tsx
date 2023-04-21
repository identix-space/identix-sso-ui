import React, {ReactNode, useState} from 'react';
import {useRouter} from 'next/router';

export default function Login(): ReactNode {
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loginViaEmailMutation] = useLoginViaEmailMutation();
    const router = useRouter();

    async function sendCode() {
        try {
            const result = await loginViaEmailMutation({variables: {email, emailCode}});
            // eslint-disable-next-line
            alert(JSON.stringify(result.data, null, 2));
            await router.push({
                pathname: '/client/dashboard'
            });
        } catch (e) {
            setErrorMessage(String(e));
        }
    }

    return <div>
        <h1>Login page</h1>
        <div>Email: {email}</div>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div>Code: {emailCode}</div>
        <input type="text" value={emailCode} onChange={(e) => setEmailCode(e.target.value)}/>
        <button onClick={sendCode}>
            Login
        </button>
        {errorMessage === ''
            ? <></>
            : <p>{errorMessage}</p>
        }
    </div>;
}
