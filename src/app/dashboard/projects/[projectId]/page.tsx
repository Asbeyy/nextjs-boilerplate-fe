'use client'
import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'

import Header from '@/components/_globals/header'
import Page from '@/components/_globals/page'
import Title from '@/components/titles/Title'
import CardAlert from '@/components/cards/CardAlert'
import ModalNewProject from '@/components/modals/ModalNewProject'
import { useSearchParams } from 'next/navigation'
import TopBar from '@/components/_pages/projects/topbar'
import PageTasks from '@/components/_pages/projects/PageTasks'


interface MainProps {
  params: {
    projectId: string
  }
}

function Main({ params }: MainProps) {
  


  return (
    <div className={styles.main}>
      <Header title={'Overview'} />
      <Page>
        <Title
          isLoading={false}
          title={'Projects'}
          subtitle={'Overview of all projects'}
        />
        <View projectId={params.projectId}/>
      </Page>
    </div>
  )
}

export default Main


interface ViewProps {
  projectId: string
}
function View({ projectId }: ViewProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'profile'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      
    }}>
            <TopBar
              tabs={['informations', 'features','tasks', 'invoices']}
              projectId={projectId}
              tab={tab}
            />

            {
              tab == 'tasks' &&
              <PageTasks projectId={projectId}/>
            }


          </div>
  )
}