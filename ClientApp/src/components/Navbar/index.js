import React,{useContext, useState} from 'react'
import { Logo } from '../Logo'
import styles from "./navbar.module.css"
import { AuthContext } from "../../context/AuthContext"
import { MyRecords } from '../MyRecords'
import { GetEntriesForUser } from '../../data'

export const Navbar = () => {
    const auth = useContext(AuthContext);
    //console.log(auth);
    const [modalActive, setModalActive] = useState(false);
    //let data = GetEntriesForUser(auth.userId);
    return (
        <div className={styles.navbar}>
            {auth.isAuthenticated && <button onClick={()=>setModalActive(true)} className={styles.records}>Мои записи</button>}
            {auth.isAuthenticated && <button onClick={()=>auth.logout()} className={styles.logout}>Выйти</button>} 
            <div className={styles.empty}></div>
            {auth.isAuthenticated && <div className={styles.name}>Петров Петр Петрович</div>}
            <div className={styles.logo_container}><Logo/></div>
            <div className={styles.modall}>
                <MyRecords active={modalActive} setActive={setModalActive} id={auth.userId}/>
            </div>
        </div>
    )
}
