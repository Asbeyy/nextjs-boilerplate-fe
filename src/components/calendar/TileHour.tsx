import React from 'react'
import styles from './calendar.module.css'

interface TileHourProps {
    children?: React.ReactNode
}

function TileHour({children}: TileHourProps) {
  return (
    <div className={styles.tileHour}>
       {children}
    </div>
  )
}

export default TileHour