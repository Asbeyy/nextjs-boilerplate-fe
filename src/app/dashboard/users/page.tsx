'use client'
import Header from '@/components/_globals/header'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Page from '@/components/_globals/page'
import { AuthProvider } from '@/components/_context/AuthContext'


function page() { 
  



  return (
    <div className={styles.main}>
        <Header title={'Overview'}/>
        <Page>
          <div>
            
          </div>
        </Page>
    </div>
  )
}

export default page