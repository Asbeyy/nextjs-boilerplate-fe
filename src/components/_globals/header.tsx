import React from 'react'
import styles from './globals.module.css'
import NavLinkItem from './navLinkItem/navLinkItem'
import { logout } from '@/services/api'

interface HeaderProps {
  title: string,
  toggle: () => void,

}


function Header({ title, toggle }: HeaderProps) {


  //Handlers
  const handleLogout = () => {
    logout()
  }
  
  return (
    <section className={styles.header}>

      <div className={styles.dropDown_title_box}>
        <span className={styles.header_icon} color="info" onClick={toggle} >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
        </span>
        <div>{title}</div>
      </div>

      <div onClick={handleLogout} className={styles.logout}>Logout</div>
    </section>

  )
}

export default Header