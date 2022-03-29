import React, {ReactNode, useState} from 'react';
import {useRegisterClientMutation} from '../../../generated/graphql';

export default function RegisterCheckCode(): ReactNode {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [registerClientMutation] = useRegisterClientMutation();

    async function sendCode() {
        const result = await registerClientMutation({variables: {email, code}});
        // eslint-disable-next-line
        alert(JSON.stringify(result.data, null, 2));
    }

    return <div>
        <h1>Registration step 1</h1>
        <div>Email: {email}</div>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div>Code: {code}</div>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
        <button onClick={sendCode}>
            Register
        </button>
    </div>;
}
