import React from 'react';
import styles from '../../styles/Loader.module.scss';

export const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
                <div className={styles.ball}></div>
            </div>
            <span>Processing...</span>
        </div>
    );
};
