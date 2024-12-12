import React from 'react'
import styles from './card.module.css'

interface CardProps {
    children: React.ReactNode
    className? : any
    style?: React.CSSProperties
}

function Card({ children, className, style }: CardProps) {
  return (
    <div className={`${className} ${styles.card}`} style={style}>
        {children}
    </div>
  )
}

export default Card