'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

import Header from '@/components/_globals/header'
import Page from '@/components/_globals/page'
import Title from '@/components/titles/Title'
import CardAlert from '@/components/cards/CardAlert'
import ModalNewUser from '@/components/modals/ModalNewUser'
import ProfilesList from '@/components/_pages/profile/ProfilesList'



function Main() {

  const [modalCreateUser, setModalCreateUser] = useState(false)

  const handleToggleModalCreateUser = () => {
    setModalCreateUser(!modalCreateUser)
  }


  return (
    <div className={styles.main}>
      <Header title={'Overview'} />
      <Page>
        
        <Title
          isLoading={false}
          title={'Users'}
          subtitle={'Overview'}
          actionRight={
            <div
              style={{
                border: '1px solid #ffffff80',
                borderRadius: '20px',
                padding: '7px 20px',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
              }}
              onClick={handleToggleModalCreateUser}
            >
              Create user
              <ModalNewUser
                isOpen={modalCreateUser}
                onClose={handleToggleModalCreateUser}
              />
            </div>
          }
        />
         

          <ProfilesList/>
        
      </Page>
    </div>
  )
}

export default Main