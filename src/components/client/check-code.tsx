import React, {FC, useState} from 'react';
import {RegisterClientMutation, useRegisterClientMutation} from '../../generated/graphql';
import {useRouter} from 'next/router';
import {FetchResult} from '@apollo/client';
import {useClientStore} from './utils/storage';

export const RegisterCheckCode: FC = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [registerClientMutation] = useRegisterClientMutation();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const {setClientCode, setClientEmail, setClientToken} = useClientStore();

    async function sendCode() {
        let result: FetchResult<RegisterClientMutation>;
        try {
            result = await registerClientMutation({variables: {email, code}});
            // eslint-disable-next-line
            alert(JSON.stringify(result.data, null, 2));
            if (result.data) {
                await setClientCode(result.data.registerClient.code ? result.data.registerClient.code : '');
                await setClientEmail(result.data.registerClient.account.email ? result.data.registerClient.account.email : '');
                await setClientToken(result.data.registerClient.token ? result.data.registerClient.token : '');
                await router.push({
                    pathname: '/client/dashboard'
                });
            }
        } catch (e) {
            setErrorMessage(String(e));
        }
    }

    return (<div>
        <h1>Registration step 1</h1>
        <div>Email: {email}</div>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <div>Code: {code}</div>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
        <button onClick={sendCode}>
            Register
        </button>
        {errorMessage === ''
            ? <></>
            : <p>{errorMessage}</p>
        }
    </div>);
};
