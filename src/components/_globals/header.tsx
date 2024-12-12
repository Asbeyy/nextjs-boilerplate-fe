import React, { useContext } from 'react'
import styles from './globals.module.css'
import { AuthContext } from '../_context/AuthContext'


interface HeaderProps {
  title?: string,
}


function Header({ title }: HeaderProps) {
  const {setIsSidepanelOpen, isSidepanelOpen} = useContext(AuthContext)

  const toggle = () => {
    setIsSidepanelOpen(!isSidepanelOpen)
  }



  return (
    <section className={styles.header}>


      <span className={styles.header_icon} color="info" onClick={toggle} >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
      </span>



      <div className='flex flex-row gap-2 items-center' style={{fontSize: '14px'}}>
        Federico Lacchini
        <div className={styles.profilePicture}>
          FL
        </div>
      </div>
    </section>

  )
}

export default Header