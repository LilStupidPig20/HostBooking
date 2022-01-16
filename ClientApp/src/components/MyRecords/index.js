import React from 'react'
import styles from './myRecords.module.css'


export const MyRecords = ({active, setActive}, props) => {
    let activeStyle = styles.active;
    let modalStyle = styles.modal;
    return(
        <div className={active ? activeStyle : modalStyle} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <p>{props.records}</p>
            </div>
        </div>
    )
}
