'use client'
import Header from '@/components/_globals/header'
import Sidebar from '@/components/_globals/sidebar'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Searchbar from '@/components/_globals/searchbar/searchbar'

function page() {

  //States
  const [isOpen, setIsOpen] = useState(true)
  const [searchResults, setSearchResults] = useState([])

  //Handlers
  const toggleSideBar = () => {
    setIsOpen(prev => !prev)
  }
  const handleSaveSearchResults = (results: any) => {
    setSearchResults(results)
    console.log(results)
  }
 
  



  return (
    <div className={styles.main}>
      <Sidebar 
        isOpen={isOpen}
      />


      <div className={styles.container}>

        <Header title={'Overview'} toggle={toggleSideBar} />

       


      </div>

    </div>
  )
}

export default page