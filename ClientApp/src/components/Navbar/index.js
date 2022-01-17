import React,{useContext, useState} from 'react';
import { Logo } from '../Logo';
import styles from "./navbar.module.css";
import { AuthContext } from "../../context/AuthContext";
import Async from 'react-async';

export const Navbar = () => {
    const auth = useContext(AuthContext);
    let urlUpcoming = `https://localhost:5001/api/Entries/GetUpcomingEntries?idUser=${auth.userId}`;
    let urlLast = `https://localhost:5001/api/Entries/GetLastEntries?idUser=${auth.userId}`;

    const GetLastEntries = () =>
        fetch(urlLast)
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())

    const GetUpcomingEntries = () =>
        fetch(urlUpcoming)
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json())

    const deleteMethod = {
        method: 'DELETE'
    }

    const deleteRecord = (info) =>
        fetch(`https://localhost:5001/api/Entries/DeleteEntry?idEntry=${info.idEntry}
        &whoTooked=${auth.userId}&whichTable=${info.whichTable}&recordTime=${info.recordTime}`, deleteMethod)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    let activeStyle = styles.active;
    let modalStyle = styles.modal;
    const [modalActive, setModalActive] = useState(false);

    return (
        <div className={styles.navbar}>
            {auth.isAuthenticated && <button onClick={()=>setModalActive(true)} className={styles.records}>Мои записи</button>}
            {auth.isAuthenticated && <button onClick={()=>auth.logout()} className={styles.logout}>Выйти</button>} 
            <div className={styles.empty}></div>
            {auth.isAuthenticated && <div className={styles.name}>{auth.fullName}</div>}
            <div className={styles.logo_container}><Logo/></div>
            <div className={modalActive ? activeStyle : modalStyle} onClick={() => setModalActive(false)}>
                <div className={styles.content}>
                    <Async promiseFn={GetUpcomingEntries}>
                            <Async.Loading>Загрузка...</Async.Loading>
                            <Async.Fulfilled>
                                {data => {
                                    return (
                                        <table className={styles.mainTableOne}>
                                            <caption className={styles.captionOne}>Предстоящие записи</caption>
                                            <thead>
                                                <tr>
                                                    <td className={styles.textTd}>Дата</td>
                                                    <td className={styles.textTd}>Время</td>
                                                    <td className={styles.textTd}>Номер стола</td>
                                                </tr>
                                            </thead>
                                            
                                            {data.map(info => (
                                                <tr className={styles.tableTr}  key={info.idEntry}>
                                                    <td className={styles.textTd}>{(info.recordTime).slice(0,-9)}</td>
                                                    <td className={styles.textTd}>{(info.recordTime).slice(11,-3)}</td>
                                                    <td className={styles.textTd}>Стол {info.whichTable}</td>
                                                    <td><button className={styles.deleteButton} onClick={() => {deleteRecord(info); alert('Бронирование отменено!')}}>Отменить</button></td>
                                                </tr>
                                            ))}
                                        </table>
                                    )
                                }}
                            </Async.Fulfilled>
                            <Async.Rejected>
                                {error => console.log(error.message)}
                            </Async.Rejected>
                    </Async>
                    <Async promiseFn={GetLastEntries}>
                            <Async.Loading>Загрузка...</Async.Loading>
                            <Async.Fulfilled>
                                {data => {
                                    return (
                                        <table className={styles.mainTableTwo}>
                                            <caption className={styles.captionTwo}>Завершенные записи</caption>
                                            <thead>
                                                <tr>
                                                    <td className={styles.textTd}>Дата</td>
                                                    <td className={styles.textTd}>Время</td>
                                                    <td className={styles.textTd}>Номер стола</td>
                                                </tr>
                                            </thead>
                                            
                                            {data.map(info => (
                                                <tr className={styles.tableTr} key={info.idEntry}>
                                                    <td className={styles.textTd}>{(info.recordTime).slice(0,-9)}</td>
                                                    <td className={styles.textTd}>{(info.recordTime).slice(11,-3)}</td>
                                                    <td className={styles.textTd}>Стол {info.whichTable}</td>
                                                </tr>
                                            ))}
                                        </table>
                                    )
                                }}
                            </Async.Fulfilled>
                            <Async.Rejected>
                                {error => console.log(error.message)}
                            </Async.Rejected>
                    </Async>
                </div>
            </div>
        </div>
    )
}
