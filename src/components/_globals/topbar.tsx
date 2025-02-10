import React, { useContext } from 'react'
import styles from './globals.module.css'
import { AuthContext } from '../_context/AuthContext'


interface HeaderProps {
  tabs?: string[],
}


function TopBar({ tabs }: HeaderProps) {
  const { setIsSidepanelOpen, isSidepanelOpen } = useContext(AuthContext)

  const toggle = () => {
    setIsSidepanelOpen(!isSidepanelOpen)
  }



  return (
    <section  className='flex flex-row gap-2 items-center' style={{ fontSize: '14px' }}>
        {
          tabs &&
          tabs.map((tab, index) => {
            return (
              <div key={index} className={styles.tab}>
                {tab}
              </div>
            )
          })
        }
    </section>

  )
}

export default TopBar