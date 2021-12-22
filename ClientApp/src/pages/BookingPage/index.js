import React from 'react'
import { Map } from '../../components/Map'
import styles from "./booking.module.css"

export const BookingPage = () => {
    return (
        <div className={styles.bookingContainer}>
            <div className={styles.controlPanel}>s</div>
            <div className={styles.bookingSide}>
                <div className={styles.map}>
                    <Map/>
                </div>
            </div>
            







        </div>
    )
}
