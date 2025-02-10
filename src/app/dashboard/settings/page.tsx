'use client'
import React, { Suspense, useEffect, useState } from 'react'
import styles from './page.module.css'

import Header from '@/components/_globals/header'
import Page from '@/components/_globals/page'
import Title from '@/components/titles/Title'
import CardAlert from '@/components/cards/CardAlert'
import Sidebar from '@/components/_pages/settings/sidebarSettings'
import { useSearchParams } from 'next/navigation'
import ProfilePage from '@/components/_pages/settings/ProfilePage'
import BillingPage from '@/components/_pages/settings/BillingPage'
import AccessPage from '@/components/_pages/settings/AccesPage'




function Main() {
  
  

  




  return (
    <div className={styles.main}>
      <Suspense fallback={<div></div>}>
        <Header title={'Overview'} />
        <Page>
          
          
          <View/>
        </Page>
      </Suspense>
    </div>
  )
}

function View() {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') || 'profile'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
      
    }}>
            <Sidebar/>

            {
              tab == 'profile' &&
              <ProfilePage/>
            }

            {
              tab == 'billing' &&
              <BillingPage/>
            }

            {
              tab == 'access' && 
              <AccessPage/>
            }


          </div>
  )
}

export default Main