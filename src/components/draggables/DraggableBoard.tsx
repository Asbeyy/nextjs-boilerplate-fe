import React from 'react'
import styles from './draggable.module.css'

interface DraggableBoardProps {
    children: React.ReactNode
}

function DraggableBoard({ children }: DraggableBoardProps) {
  return (
    <div className={styles.draggableBoard}>
        {
            children
        }
    </div>
  )
}

export default DraggableBoard