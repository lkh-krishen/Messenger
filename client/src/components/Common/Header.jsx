import React from 'react'
import styles from '../../styles/Header.module.css'

function Header() {

    return (
        <div className={styles.headerDiv}>
            <center>
                <div className={styles.headerTitleDiv}>
                    Messenger
                </div>
            </center>
        </div>
    )
}

export default Header