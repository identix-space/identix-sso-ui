import React, {ReactNode} from 'react';

export default function Dashboard(): ReactNode {
    return <div>
        <h1>Dashboard</h1>
        <div>Email: client@gmail.com</div>
        <button>Logout</button>
        <br/>
        <br/>
        <button>Generate new token</button>
        <div>Token: zTKiVhYXaoEC6ud6icSGdiyoHchacEd2atA4jEPFNRtAzTKhMDesEWo39L546oko</div>
    </div>;
}
