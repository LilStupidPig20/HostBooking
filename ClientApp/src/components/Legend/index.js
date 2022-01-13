import React from 'react'
import styles from './legend.module.css'

export const Legend = () => {
    return (
        <div className={styles.legend}>
            <div className={styles.block}>
                <div className={styles.red} />
                <p className={styles.text}>&mdash;&nbsp;стол занят весь день</p>
            </div>
            <div className={styles.block}>
                <div className={styles.blue}/>
                <p className={styles.text}>&mdash;&nbsp;есть свободное время</p>
            </div>
            <div className={styles.block}>
                <div className={styles.green}/>
                <p className={styles.text}>&mdash;&nbsp;стол свободен весь день</p>
            </div>
        </div>
    )
}
