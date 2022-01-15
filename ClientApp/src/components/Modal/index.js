import React from 'react'
import { TableTimes } from '../TableTimes';
import styles from './modal.module.css'

export const ModalWindow = ({active, setActive}) => {
    let activeStyle = styles.active;
    let modalStyle = styles.modal;
    return (
        <div className={active ? activeStyle : modalStyle} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <TableTimes />
                
            </div>
            <div className={styles.wow}></div>
            <button className={styles.enterButton}>Забронировать</button>
        </div>
    );
}