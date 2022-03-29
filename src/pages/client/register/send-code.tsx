import React, {ReactNode, useState} from 'react';
import {useGenerateEmailCodeMutation} from '../../../generated/graphql';

export default function RegisterSendCode(): ReactNode {
    const [email, setEmail] = useState('');
    const [generateEmailCodeMutation] = useGenerateEmailCodeMutation();

    async function sendCode() {
        const generateResult = await generateEmailCodeMutation({variables: {email}});
        // eslint-disable-next-line
        alert(JSON.stringify(generateResult.data, null, 2));
    }

    return <div>
        <div>Email: {email}</div>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button onClick={sendCode}>
            Send code
        </button>
    </div>;
}
