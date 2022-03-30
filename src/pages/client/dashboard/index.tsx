import React, {ReactNode} from 'react';
import {useClientStore} from '../../../components/client/utils/storage';

export default function Dashboard(): ReactNode {
    const {email, token, code} = useClientStore();
    console.log(code);
    return <div>
        <h1>Dashboard</h1>
        <div>Email: {email}</div>
        <button>Logout</button>
        <br/>
        <br/>
        <button>Generate new token</button>
        <div>Token: {token}</div>
    </div>;
}
