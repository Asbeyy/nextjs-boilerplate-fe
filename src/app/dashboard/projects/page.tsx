'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'

import Header from '@/components/_globals/header'
import Page from '@/components/_globals/page'
import Title from '@/components/titles/Title'
import CardAlert from '@/components/cards/CardAlert'
import ModalNewProject from '@/components/modals/ModalNewProject'
import HorizontalProjectSection from '@/components/_pages/projects/HorizontalProjectSection'
import { getAllProjects } from '@/services/api'
import toast from 'react-hot-toast'




function Main() {
  const [modalCreateProject, setModalCreateProject] = useState(false)
  const [projects, setProjects] = useState([])
  const [categories, setCategories] = useState([])

  const handleToggleModalCreateProject = () => {
    setModalCreateProject(!modalCreateProject)
  }

  const handleFetchAllProjects = async () => {
    const call = await getAllProjects('pending')
    console.log(call)
    if (call.success){
      
      const uniqueCategories = call.projects.reduce((acc: any, obj: any) => {
        if (!acc.includes(obj.category)) {
          acc.push(obj.category);
        }
        return acc;
      }, []);

      console.log(uniqueCategories)

      setProjects(call.projects)
      setCategories(uniqueCategories)
    } else {
      toast.error(call.message)
    }
  }


  useEffect(() => {
    handleFetchAllProjects()
  }, [])  



  return (
    <div className={styles.main}>
      <Header title={'Overview'} />
      <Page>
        <Title
          isLoading={false}
          title={'Projects'}
          subtitle={'Overview of all projects'}
          actionRight={
            <div
              style={{
                border: '1px solid #ffffff80',
                borderRadius: '20px',
                padding: '7px 20px',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
              }}
              onClick={handleToggleModalCreateProject}
            >
              New Project
              {
                modalCreateProject &&
                <ModalNewProject
                  isOpen={modalCreateProject}
                  onClose={handleToggleModalCreateProject}
                />
              }
            </div>
          }
        />
        <div className='flex flex-col gap-14 w-full'> 
          {
            categories
            .sort(category => category === '' ? -1 : 1)
            .map((category) => (
              <HorizontalProjectSection
                key={category}
                projects={projects.filter((project: any) => project.category === category)}
                category={category}
              />
            ))
          }
        </div>
        
        
      </Page>
    </div>
  )
}

export default Main