import React from 'react'
import { Logo } from '../Logo'
import styles from "./navbar.module.css"

export const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo_container}><Logo/></div>
            

        </div>
    )
}
