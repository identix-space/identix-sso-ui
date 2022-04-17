import React from 'react';

export const AuthEnterCodeFromEmail = () => {
    return (
        <div>
            <h1>Enter Code From Email</h1>
        </div>
    );
};
// import {FetchResult} from '@apollo/client';
// import {AuthGoToClientSite} from './authGoToClientSite';
//
// export const AuthEnterCodeFromEmail: FC = () => {
//     const [email, setEmail] = useState('');
//     const [code, setCode] = useState('');
//     const [goToSite, setGoToSite] = useState<boolean>(false);
//     const [registerClientMutation] = useRegisterClientMutation();
//     const [errorMessage, setErrorMessage] = useState<string>('');
//
//     async function sendCode() {
//         let result: FetchResult<RegisterClientMutation>;
//         try {
//             result = await registerClientMutation({variables: {email, code}});
//             // eslint-disable-next-line
//             alert(JSON.stringify(result.data, null, 2));
//             if (result.data) {
//                 setGoToSite(true);
//             }
//         } catch (e) {
//             setErrorMessage(String(e));
//         }
//     }
//
//     return (<div>
//         {goToSite
//             ? <AuthGoToClientSite />
//             : <>
//                 <h1>Enter your code</h1>
//                 <div>Email: {email}</div>
//                 <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
//                 <div>Code: {code}</div>
//                 <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
//                 <button onClick={sendCode}>
//                     Register
//                 </button>
//                 {errorMessage === ''
//                     ? <></>
//                     : <p>{errorMessage}</p>
//                 }</>
//         }
//
//     </div>);
// };
