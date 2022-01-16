import React from 'react'
import { GetTableInfo } from '../../data';
import OneTableTime from '../OneTableTime';
import styles from './modal.module.css'

export const ModalWindow = ({active, setActive}, props) => {
    let activeStyle = styles.active;
    let modalStyle = styles.modal;
    return (
        <div className={active ? activeStyle : modalStyle} onClick={() => setActive(false)}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <TableTimes date={props.date} id={props.id}/>
            </div>
            <div className={styles.wow}></div>
            <button className={styles.enterButton}>Забронировать</button>
        </div>
    );
}

const TableTimes = (props) => {
    //let data = GetTableInfo(props.id, props.date)
    return (
        <div>
            <table className={styles.tableTime}>
                <tr>
                    <td><OneTableTime time='09:00' capacity={0}/></td>
                    <td><OneTableTime time='10:00' capacity={0}/></td>
                    <td><OneTableTime time='11:00' capacity={0}/></td>
                    <td><OneTableTime time='12:00' capacity={0}/></td>
                </tr>
                <tr>
                    <td><OneTableTime time='13:00' capacity={0}/></td>
                    <td><OneTableTime time='14:00' capacity={0}/></td>
                    <td><OneTableTime time='15:00' capacity={0}/></td>
                    <td><OneTableTime time='16:00' capacity={0}/></td>
                </tr>
                <tr>
                    <td><OneTableTime time='17:00' capacity={0}/></td>
                    <td><OneTableTime time='18:00' capacity={0}/></td>
                    <td><OneTableTime time='19:00' capacity={0}/></td>
                    <td><OneTableTime time='20:00' capacity={0}/></td>
                </tr>
            </table>
        </div>
    )
}