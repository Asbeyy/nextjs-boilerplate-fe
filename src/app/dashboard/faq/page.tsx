'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

import Header from '@/components/_globals/header'
import Page from '@/components/_globals/page'
import Title from '@/components/titles/Title'
import CardAlert from '@/components/cards/CardAlert'
import UnderConstruction from '@/components/404/UnderConstruction'



function Main() {





  return (
    <div className={styles.main}>
      <Header title={'Overview'} />
      <Page>
        <br />
        <Title
          isLoading={false}
          title={'FAQ'}
          subtitle={'Search for answers to common questions'}
          
        />
        <UnderConstruction/>
        
      </Page>
    </div>
  )
}

export default Main