import React from 'react'
import Button from '../buttons/Button'

import styles from './noresults.module.css'
import { useRouter } from 'next/navigation'

function NoResults() {
    const router = useRouter()
    const [isMouseOver, setIsMouseOver] = React.useState(false)

    const handleMouseOver = () => {
        console.log('Mouse over')   
        setIsMouseOver(!isMouseOver)
    }


  return (
    <div className='w-full flex justify-center items-center flex-col'>
        <img src="/icons/magnifing_glass.png" width={300} height={300} alt="" />
        <h1 className='text-4xl font-bold'>It seems like you are new here</h1>

        <div className='w-[300px] mt-4'>
            <Button
                onHover={handleMouseOver}
                text='Generate your first track'
                icon={
                    <img 
                        src='/icons/ai.svg'
                        className={styles.noResultsIcon}
                        style={{
                            transform: isMouseOver ? ' rotate(180deg)' : 'rotate(0deg)',
                            
                        }}
                    />
                }
                color='white'
                backgroundColor='var(--background)'
                onClick={() => {
                    router.push('/dashboard')
                }}
            />
        </div>
    </div>
  )
}

export default NoResults