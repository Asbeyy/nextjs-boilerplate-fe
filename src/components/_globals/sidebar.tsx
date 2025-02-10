import React, { useContext } from 'react'
import styles from './globals.module.css'
import Link from 'next/link'
import { CircleHelp, FolderKanban, Home, ListTodo, LogOut, PanelsTopLeft, Settings, Tags, Users, Users2, Users2Icon } from 'lucide-react'

import { logout } from '@/services/api'
import { on } from 'events'
import { AuthContext } from '../_context/AuthContext'
import { usePathname } from 'next/navigation'
import Image from 'next/image'


function Sidebar() {
  const { isSidepanelOpen, role } = useContext(AuthContext)
  const path = usePathname()

  //Handlers
  const handleLogout = () => {
    logout()
  }

  return (
    <div
      className={styles.sidebar}
      style={{
        width: isSidepanelOpen ? '250px' : '50px'
      }}
    >



      <div
        className={styles.containerLinks}
      >
        {/* Top Elements */}
        <div>
          <ElementSidebar
            currentPath={path}
            icon={<PanelsTopLeft width={18} />}
            text="dashboard"
            isOpen={isSidepanelOpen}
            href="/dashboard"
            textStyle={{
              fontWeight: 500,
              textTransform: 'uppercase'
            }}
          />
          <br />
          <ElementSidebar
            currentPath={path}
            icon={<Tags width={18} />}
            text="Leads"
            isOpen={isSidepanelOpen}
            href="/dashboard/leads"
          />
          <ElementSidebar
            currentPath={path}
            icon={<ListTodo width={18} />}
            text="Projects"
            isOpen={isSidepanelOpen}
            href="/dashboard/projects"
          />
          <ElementSidebar
            currentPath={path}
            icon={<FolderKanban width={18} />}
            text="Templates"
            isOpen={isSidepanelOpen}
            href="/dashboard/templates"
          />
          <ElementSidebar
            currentPath={path}
            icon={<Users width={18} />}
            text="Users"
            isOpen={isSidepanelOpen}
            href="/dashboard/users"
          />

        </div>


        {/* Bottom Elements */}
        <div className='flex flex-col items-center'>
          <ElementSidebar
            currentPath={path}
            icon={
              <Image
                src={'/images/caffeine_code.gif'}
                alt='Code Lab Inc. logo'
                width={25}
                height={30}
                style={{
                  transform: 'translateY(-5px) translateX(-3px)'
                }}
              />
            }
            text="Settings"
            isOpen={isSidepanelOpen}
            href="/dashboard/settings"
          />
          <ElementSidebar
            currentPath={path}
            icon={
              <CircleHelp width={18}/>
            }
            text="F.A.Q"
            isOpen={isSidepanelOpen}
            href="/dashboard/faq"
          />
          <ElementSidebar
            currentPath={path}
            icon={<LogOut width={18} />}
            text="Logout"
            isOpen={isSidepanelOpen}
            onClick={handleLogout}
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
  isOpen: boolean
  currentPath: string
  href?: string
  textStyle?: React.CSSProperties
  onClick?: () => void
}
const ElementSidebar = ({
  icon,
  text,
  isOpen,
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
          paddingLeft: isOpen ? '15px' : '12px',

          ...textStyle
        }}
      >
        {icon}

        <div
          style={{
            opacity: isOpen ? 1 : 0,
            left: isOpen ? '40px' : '60px',

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
      paddingLeft: isOpen ? '15px' : '12px',
      ...textStyle
    }}>
      {icon}

      <div
        style={{
          opacity: isOpen ? 1 : 0,
          left: isOpen ? '40px' : '60px',

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