'use client'

import React, { useState } from 'react'
import style from './button.module.css'
import LoaderWhite from '../loaders/LoaderWhite'

interface ButtonProps {
    onClick: () => any
    color: string
    backgroundColor: string
    text: any
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
          opacity: deactive ? '.3' : '1',
          color: color,
          cursor: !isLoading || deactive ? 'pointer' : 'not-allowed',
          pointerEvents: deactive ? 'none' : 'auto'
        }}
        aria-disabled={deactive}
        onClick={()=>{
          !isLoading ?
          handleClick() :
          null
        }}
    >
      {
        !isLoading ?
        text :
        <LoaderWhite/>
      }
    </div>
  )
}

export default ButtonLoading