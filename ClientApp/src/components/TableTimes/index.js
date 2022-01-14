import React from 'react'
import OneTableTime from '../OneTableTime'
import styles from './times.module.css'



export const TableTimes = () => {
    function selfRandom(min, max)
    {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return (
        <div>
            <table className={styles.tableTime}>
                
                <tr>
                    <td><OneTableTime time='09' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='10' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='11' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='12' capacity={selfRandom(0,1)}/></td>
                </tr>
                <tr>
                    <td><OneTableTime time='13' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='14' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='15' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='16' capacity={selfRandom(0,1)}/></td>
                </tr>
                <tr>
                    <td><OneTableTime time='17' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='18' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='19' capacity={selfRandom(0,1)}/></td>
                    <td><OneTableTime time='20' capacity={selfRandom(0,1)}/></td>
                </tr>
            </table>
        </div>
    )
}