import React, { useContext } from 'react'
import styles from './globals.module.css'
import Link from 'next/link'
import { FolderKanban, Home, ListTodo, LogOut, PanelsTopLeft, Settings, Tags, Users, Users2, Users2Icon } from 'lucide-react'

import { logout } from '@/services/api'
import { on } from 'events'
import { AuthContext } from '../_context/AuthContext'


function Sidebar() {
  const {isSidepanelOpen,role} = useContext(AuthContext)

  //Handlers
  const handleLogout = () => {
    logout()
  }

  return (
    <div
      className={styles.sidebar}
      style={{
        width: isSidepanelOpen ? '250px' : '40px'
      }}
    >


      <div
        className={styles.containerLinks}
      >
        {/* Top Elements */}
        <div>
          <ElementSidebar
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
            icon={<Users width={18} />}
            text="Users"
            isOpen={isSidepanelOpen}
            href="/dashboard/users"
          />
          <ElementSidebar
            icon={<ListTodo width={18} />}
            text="Tasks"
            isOpen={isSidepanelOpen}
            href="/dashboard"
          />
          <ElementSidebar
            icon={<Tags width={18} />}
            text="Leads"
            isOpen={isSidepanelOpen}
            href="/dashboard"
          />
          <ElementSidebar
            icon={<FolderKanban width={18} />}
            text="Templates"
            isOpen={isSidepanelOpen}
            href="/dashboard"

          />

        </div>


        {/* Bottom Elements */}
        <div>
          <ElementSidebar
            icon={<Settings width={18} />}
            text="Settings"
            isOpen={isSidepanelOpen}
            href="/"
          />
          <ElementSidebar
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
  href?: string
  textStyle?: React.CSSProperties
  onClick?: () => void
}
const ElementSidebar = ({
  icon,
  text,
  isOpen,
  href,
  textStyle,
  onClick
}: ElementSidebarProps) => {

  if (onClick) {
    return(
      <div
        onClick={onClick}
        className={styles.elementSidebar}
        style={{
          justifyContent: isOpen ? 'flex-start' : 'center',
          paddingLeft: isOpen ? '15px' : '0px',
          ...textStyle
        }}
      >
        {icon}
        {
          isOpen &&
          text
        }
      </div>
    )
  }


  return (
    <Link href={href ?? ''} className={styles.elementSidebar} style={{
      justifyContent: isOpen ? 'flex-start' : 'center',
      paddingLeft: isOpen ? '15px' : '0px',
      ...textStyle
    }}>
      {icon}
      {
        isOpen &&
        text
      }
    </Link>
  )
}