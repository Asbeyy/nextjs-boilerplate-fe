'use client'

import React, { useState } from 'react'
import style from './button.module.css'
import Loader1 from '../loaders/Loader1'

interface ButtonProps {
    onHover?: () => void
    onClick: () => void
    icon?: React.ReactNode
    color: string
    backgroundColor: string
    text: string
}


function Button({onClick,onHover, icon, color,backgroundColor, text}: ButtonProps) {
  


  return (
    <div
        onMouseEnter={onHover}
        onMouseLeave={onHover}
        className={style.component}
        style={{
          background: backgroundColor, 
          color: color,
          cursor: 'pointer'
        }}
        onClick={()=>{
          onClick() 
        }}
    >
      {
        icon &&
        icon
      }
      &nbsp;
      &nbsp;
      {text}
    </div>
  )
}

export default Button