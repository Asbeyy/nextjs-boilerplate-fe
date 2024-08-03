'use client'

import React, { useState } from 'react'
import style from './button.module.css'
import Loader1 from '../loaders/Loader1'

interface ButtonProps {
    onClick: () => any
    color: string
    backgroundColor: string
    text: string
    deactive?: boolean
}


function ButtonLoading({onClick, color,backgroundColor, text, deactive}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleClick = async () => {

    setIsLoading(true)

    const click = await onClick()

    if (!click){
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
          cursor: !isLoading ? 'pointer' : 'not-allowed',
          pointerEvents: deactive ? 'none' : 'auto'
        }}
        onClick={()=>{
          !isLoading ?
          handleClick() :
          null
        }}
    >
      {
        !isLoading ?
        text :
        <Loader1/>
      }
    </div>
  )
}

export default ButtonLoading