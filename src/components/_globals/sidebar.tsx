import React from 'react'
import styles from './globals.module.css'
/*import Link from 'next/link' */
import NavLinkItem from './navLinkItem/navLinkItem'

interface SidebarProps {
  isOpen: boolean
}

function Sidebar({ isOpen }: SidebarProps) {

  return (
    <div
      className={styles.sidebar}
      style={{
        width: isOpen ? '250px' : '0px'
      }}
    >
      <a className={styles.logo} href='/dashboard'>
        <img src={process.env.NEXT_PUBLIC_PLATFORM_LOGO} style={{height: '50px'}} alt="" />
      </a>

      {
        isOpen &&
        <div
          className={styles.containerLinks}
          style={{
            color: isOpen ? 'white' : 'transparent',
          }}
        >
          <a className={styles.a} href="">Home</a>
          <a className={styles.a} href="">Users</a>
          <a className={styles.a} href="">Settings</a>
        </div>
      }

    </div>
  )
}

export default Sidebar