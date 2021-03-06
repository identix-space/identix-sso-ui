import React, {ReactNode, useState} from 'react';
import {GenerateEmailCodeMutation, useGenerateEmailCodeMutation} from '../../../generated/graphql';
import {AuthEnterCodeFromEmail} from '../../../components/auth/authEnterCodeFromEmail';
import {FetchResult} from '@apollo/client';


export default function authLoginWithEmail(): ReactNode {
    const [email, setEmail] = useState('');
    const [generateEmailCodeMutation] = useGenerateEmailCodeMutation();
    const [isToken, setIsToken] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    async function sendCode() {
        let result: FetchResult<GenerateEmailCodeMutation>;
        try {
            result = await generateEmailCodeMutation({variables: {email}});
            // eslint-disable-next-line
            if (result.data?.generateEmailCode.result) {
                try {
                    setIsToken(result.data?.generateEmailCode.result);
                } catch (e) {
                    setErrorMessage('Something go wrong. Please try one more time.');
                }
            }
        } catch (e) {
            setErrorMessage('Not valid email, please enter the correct one.');
        }


    }

    return (
        <>
            {isToken
                ? <AuthEnterCodeFromEmail/>
                : <div>
                    <h1>Login with email</h1>
                    <div>Email: {email}</div>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <button onClick={() => sendCode()}>
                        Send code
                    </button>
                </div>
            }
            {errorMessage !== ''
                ? <p>{errorMessage}</p>
                : <></>
            }
        </>
    );
}
