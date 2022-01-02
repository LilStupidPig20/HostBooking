import React,{useContext} from 'react'
import { Logo } from '../Logo'
import styles from "./navbar.module.css"
import {AuthContext} from "../../context/AuthContext"

export const Navbar = () => {
    const auth = useContext(AuthContext);
    return (
        <div className={styles.navbar}>
            <div className={styles.logo_container}><Logo/></div>
            {auth.isAuthenticated && <button onClick={()=>auth.logout()} className={styles.logout}>Выйти</button>}

        </div>
    )
}
