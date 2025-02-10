import React from 'react'
import Button from '../buttons/Button'

import styles from './noresults.module.css'
import { useRouter } from 'next/navigation'

function NoUsers() {
    const router = useRouter()
    const [isMouseOver, setIsMouseOver] = React.useState(false)

    const handleMouseOver = () => {
        console.log('Mouse over')   
        setIsMouseOver(!isMouseOver)
    }


  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <img src="/icons/magnifing_glass.png" width={300} height={300} alt="" />
        <h1 style={{color: '#ffffff60'}} className='text-4xl font-bold'>There are no users</h1>
        <p style={{color: '#ffffff60'}}>Search with other parameters</p>
    </div>
  )
}

export default NoUsers