import React from 'react'
import OneTableTime from '../OneTableTime'
import styles from './times.module.css'

export const TableTimes = () => {
    return (
        <div>
            <table className={styles.tableTime}>
                <tr>
                    <td><OneTableTime time='09' capacity='0'/></td>
                    <td><OneTableTime time='10' capacity='1'/></td>
                    <td><OneTableTime time='11' capacity='1'/></td>
                    <td><OneTableTime time='12' capacity='0'/></td>
                </tr>
                <tr>
                    <td><OneTableTime time='13' capacity='1'/></td>
                    <td><OneTableTime time='14' capacity='1'/></td>
                    <td><OneTableTime time='15' capacity='0'/></td>
                    <td><OneTableTime time='16' capacity='0'/></td>
                </tr>
                <tr>
                    <td><OneTableTime time='17' capacity='1'/></td>
                    <td><OneTableTime time='18' capacity='1'/></td>
                    <td><OneTableTime time='19' capacity='1'/></td>
                    <td><OneTableTime time='20' capacity='1'/></td>
                </tr>
            </table>
        </div>
    )
}