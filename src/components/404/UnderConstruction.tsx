import React from 'react'
import Button from '../buttons/Button'

import styles from './noresults.module.css'
import { useRouter } from 'next/navigation'

function UnderConstruction() {
    const router = useRouter()
    const [isMouseOver, setIsMouseOver] = React.useState(false)

    const handleMouseOver = () => {
        console.log('Mouse over')   
        setIsMouseOver(!isMouseOver)
    }


  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <img src='/images/under_construction.webp' width={300} height={300} alt="" className='mt-10'/>
        <h1 className='text-4xl font-bold mt-20'>This page is under construction</h1>

        <div className='w-[560px] mt-4'>
            <div
                onClick={() => {
                    router.push('/dashboard')
                }}
                style={{
                    background: isMouseOver ? 'yellowgreen' : 'white',
                    color: isMouseOver ? 'white' : 'black',
                    cursor: 'pointer',
                    width: '100%',
                    height: '40px',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '20px',
                }}
            >
                Go home
            </div>
        </div>
    </div>
  )
}

export default UnderConstruction