'use client'

import React, { useState } from 'react'
import style from './button.module.css'
import Loader1 from '../loaders/Loader1'

interface ButtonProps {
    onClick: () => void
    color: string
    backgroundColor: string
    text: string
}


function Button({onClick, color,backgroundColor, text}: ButtonProps) {
  


  return (
    <div
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
      {text}
    </div>
  )
}

export default Button