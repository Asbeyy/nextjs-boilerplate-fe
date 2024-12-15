import React, { useContext } from 'react'
import styles from '../../_globals/globals.module.css'
import Link from 'next/link'
import { CircleHelp, CreditCard, FolderKanban, Home, KeyIcon, ListTodo, LogOut, PanelsTopLeft, Settings, Tags, UploadIcon, User, Users, Users2, Users2Icon } from 'lucide-react'

import { logout } from '@/services/api'
import { on } from 'events'

import { usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'


function Sidebar() {
 
  const searchParams = useSearchParams()
  const path = searchParams.get('tab')

  //Handlers
  const handleLogout = () => {
    logout()
  }

  return (
    <div
      className={styles.sidebarSettings}
    >



      <div
        className={styles.containerLinks}
        style={{
          
        }}
      >
        {/* Top Elements */}
        <div>
          <ElementSidebar
            currentPath={path}
            icon={<User width={18} />}
            text="profile"
            
            href="?tab=profile"
            textStyle={{
              fontWeight: 500,
              textTransform: 'uppercase'
            }}
          />
          <br />
          <ElementSidebar
            currentPath={path}
            icon={<CreditCard width={18} />}
            text="Billing"
            
            href="?tab=billing"
          />
          <ElementSidebar
            currentPath={path}
            icon={<KeyIcon width={18} />}
            text="Access"
            
            href="?tab=access"
          />
          
          

        </div>



      </div>


    </div>
  )
}

export default Sidebar





interface ElementSidebarProps {

  icon: React.ReactNode
  text: string
  
  currentPath: string | null
  href?: string
  textStyle?: React.CSSProperties
  onClick?: () => void
}
const ElementSidebar = ({

  icon,
  text,
  
  currentPath,
  href,
  textStyle,
  onClick
}: ElementSidebarProps) => {


  if (onClick) {
    return (
      <div
        onClick={onClick}
        className={styles.elementSidebar}
        style={{
          justifyContent: 'flex-start',
          paddingLeft: '15px',
          ...textStyle
        }}
      >
        {icon}

        <div
          style={{
            left: '40px'
          }}
          className={styles.nameElement}>
          {text}
        </div>
        {
          currentPath === href &&
          <div className={styles.selectorBar} />
        }

      </div>
    )
  }


  return (
    <Link href={href ?? ''} className={styles.elementSidebar} style={{
      justifyContent: 'flex-start',
      paddingLeft: '15px',
      ...textStyle
    }}>
      {icon}

      <div
        style={{
          left:'40px'
        }}
        className={styles.nameElement}>
        {text}
      </div>

      <div
        className={styles.selectorBar}
        style={{
          transition: 'opacity .5s ease, left .5s ease',
          opacity: currentPath === href ? 1 : 0,

        }}
      />


    </Link>
  )
}