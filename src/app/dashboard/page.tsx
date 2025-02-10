'use client'
import Header from '@/components/_globals/header'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Page from '@/components/_globals/page'
import { AuthProvider } from '@/components/_context/AuthContext'
import CardAlert from '@/components/cards/CardAlert'
import Title from '@/components/titles/Title'
import { Lightbulb } from 'lucide-react'


function page() { 
  



  return (
    <div className={styles.main}>
        <Header title={'Overview'}/>
        <Page>
          <Title
            title={'Dashboard'}
            subtitle={'Overview'}
            
          />
          <CardAlert
            title={'Welcome to the dashboard'}
            message={'This is the dashboard of the application. Here you can see all the information you need to manage your account.'}
            color='orange'
          />
      
  
        </Page>
    </div>
  )
}

export default page