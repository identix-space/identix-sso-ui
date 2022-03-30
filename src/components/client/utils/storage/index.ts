import create from 'zustand';
import {persist} from 'zustand/middleware';


interface IClient {
    code: string;
    email: string;
    token: string;
    setClientCode: (code: string) => void;
    setClientEmail: (code: string) => void;
    setClientToken: (code: string) => void;
}

export const useClientStore = create<IClient>(
    persist(
        (set) => ({
            // initial state
            code: '',
            email: '',
            token: '',
            // methods for manipulating state
            setClientCode: (code: string) => {
                set((state) => ({
                    code: state.code = code
                }));
            },
            setClientEmail: (email: string) => {
                set((state) => ({
                    email: state.email = email
                }));
            },
            setClientToken: (token: string) => {
                set((state) => ({
                    token: state.token = token
                }));
            }
        }),
        {
            name: 'client'
        }
    ));
