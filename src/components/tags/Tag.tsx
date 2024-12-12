import React from 'react'
import styles from './tags.module.css'

interface TagProps {
    text: string, 
    style?: React.CSSProperties
}

function Tag({ text, style }: TagProps) {
  return (
    <div className={styles.tag} style={style}>
        {
            text
        }
    </div>
  )
}

export default Tag