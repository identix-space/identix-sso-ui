import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide, {SlideProps} from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import {AlertColor} from '@mui/material/Alert/Alert';
import create from 'zustand';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

export const ModalAlert = () => {

    const {modalIsOpen, alertText, alertType, setModalIsOpen} = useModalAlertSettings();

    const handleClose = () => {
        setModalIsOpen(false);
    };

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={modalIsOpen}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
                message="I love snacks"
                key={'top center'}
            ><Alert onClose={handleClose} severity={`${alertType}`} sx={{width: '100%'}} elevation={6} variant="filled">
                    {alertText}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
};

interface IModalAlert {
    modalIsOpen: boolean;
    alertText: string;
    alertType: AlertColor;
    setModalIsOpen: (modalIsOpen: boolean) => void;
    setAlertText: (alertText: string) => void;
    setAlertType: (alertType: AlertColor) => void;
}

export const useModalAlertSettings = create<IModalAlert>(

    (set) => ({
        // initial state
        modalIsOpen: false,
        alertText: 'Something go wrong...',
        alertType: 'error',
        // methods for manipulating state
        setModalIsOpen: (modalIsOpen: boolean) => {
            set((state) => ({
                modalIsOpen: state.modalIsOpen = modalIsOpen
            }));
        },
        setAlertText: (alertText: string) => {
            set((state) => ({
                alertText: state.alertText = alertText
            }));
        },
        setAlertType: (alertType: AlertColor) => {
            set((state) => ({
                alertType: state.alertType = alertType
            }));
        }
    })
);
