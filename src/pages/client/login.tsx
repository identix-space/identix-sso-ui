import React, {ReactNode, useState} from 'react';
import {useLoginByEmailMutation} from '../../generated/graphql';

export default function Login(): ReactNode {
    const [email, setEmail] = useState('');
    const [emailCode, setEmailCode] = useState('');
    const [loginByEmailMutation] = useLoginByEmailMutation();

    async function sendCode() {
        const result = await loginByEmailMutation({variables: {email, emailCode}});
        // eslint-disable-next-line
        alert(JSON.stringify(result.data, null, 2));
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
    </div>;
}
