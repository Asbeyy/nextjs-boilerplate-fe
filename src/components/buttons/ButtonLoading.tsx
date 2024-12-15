'use client'

import React, { useState } from 'react'
import style from './button.module.css'
import Loader1 from '../loaders/Loader1'

interface ButtonProps {
    onClick: () => any
    color: string
    backgroundColor: string
    text: any
    deactive?: boolean
}

function ButtonLoading({ onClick, color, backgroundColor, text, deactive }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (isLoading) return
    setIsLoading(true)

    const finish = await onClick()
    
    if (finish) {
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }

  }
  

  return (
    <div
      className={style.component}
      style={{
        background: backgroundColor,
        color: color,
        cursor: isLoading || deactive ? 'not-allowed' : 'pointer',
        pointerEvents: isLoading || deactive ? 'none' : 'auto', // Fully disables click during loading
        opacity: isLoading || deactive ? 0.5 : 1,
      }}
      onClick={handleClick}
    >
      {isLoading ? <Loader1 /> : text}
    </div>
  )
}

export default ButtonLoading
