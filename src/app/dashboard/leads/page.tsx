'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

import Header from '@/components/_globals/header'
import Page from '@/components/_globals/page'
import Title from '@/components/titles/Title'
import CardAlert from '@/components/cards/CardAlert'
import UnderConstruction from '@/components/404/UnderConstruction'
import LeadsList from '@/components/_pages/leads/LeadsList'



function Main() {





  return (
    <div className={styles.main}>
      <Header />
      <Page>
        <Title
          isLoading={false}
          title={'Leads'}
          subtitle={'List of all scraped Leads'}
          
        />
        
        <LeadsList/>
        
      </Page>
    </div>
  )
}

export default Main