import React from 'react'
import styles from './title.module.css'

interface TitleXLProps {
    text: string
    style?: React.CSSProperties
}

function TitleXL({ text, style }: TitleXLProps) {
  return (
    <div className={styles.containerTitleXL} style={style}>
        {text}
    </div>
  )
}

export default TitleXL