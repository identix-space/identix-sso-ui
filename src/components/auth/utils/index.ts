import create from 'zustand';
import {persist} from 'zustand/middleware';
import {LOCAL_STORAGE_NAME} from '../../../constants';


interface IUser {
    code: string;
    token: string;
    setUserCode: (code: string) => void;
    setUserToken: (code: string) => void;
}

export const useClientStore = create<IUser>(
    persist(
        (set) => ({
            // initial state
            code: '',
            token: '',
            // methods for manipulating state
            setUserCode: (code: string) => {
                set((state) => ({
                    code: state.code = code
                }));
            },
            setUserToken: (token: string) => {
                set((state) => ({
                    token: state.token = token
                }));
            }
        }),
        {
            name: LOCAL_STORAGE_NAME
        }
    ));
