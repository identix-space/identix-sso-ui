import React, {ReactNode, useState} from 'react';
import {useRegisterClientMutation} from '../../../generated/graphql';

export default function RegisterCheckCode(): ReactNode {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [generateEmailCodeMutation] = useRegisterClientMutation();

    async function sendCode() {
        const generateResult = await generateEmailCodeMutation({variables: {email, code}});
        // eslint-disable-next-line
        alert(JSON.stringify(generateResult.data, null, 2));
    }

    return <div>
        <div>Email: {email}</div>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div>Code: {code}</div>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
        <button onClick={sendCode}>
            Send code
        </button>
    </div>;
}
