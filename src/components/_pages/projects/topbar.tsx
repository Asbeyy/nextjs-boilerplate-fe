import React, { useContext } from 'react'
import styles from '../../_globals/globals.module.css'
import { AuthContext } from '@/components/_context/AuthContext'
import Link from 'next/link'



interface HeaderProps {
  tabs?: string[],
  projectId: string,
  tab: string
}


function TopBar({ tabs, projectId, tab }: HeaderProps) {
  
  
  return (
    <section  className='flex flex-row w-1/1 gap-4 items-center justify-center rounded-lg py-2 px-2' style={{ fontSize: '14px', background: 'var(--status-background)'}}>
      <div
        className='cursor-pointer flex flex-row items-center gap-2 w-full '
        style={{
        }}
      >
          {
            tabs &&
            tabs.map((_tab, index) => {
              console.log('tab', tab)
              return (
                <Link 
                  key={index} 
                  className={`rounded-[8px] w-1/${tabs.length}`}
                  href={`/dashboard/projects/${projectId}/?tab=${_tab}`}
                  style={{
                    
                    textAlign: 'center',
                    padding: '10px 20px',  
                    background: _tab === tab ? 'var(--background)' : '#ffffff40',        
                    textTransform: 'capitalize',
                  }}
                >
                  {_tab}
                </Link>
              )
            })
          }
      </div>
    </section>

  )
}

export default TopBar