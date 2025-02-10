import React from 'react'
import styles from './loder.module.css'


interface SkeletonProps {
  width?: string
  height?: string
  index?: number
}

function Skeleton({

  width,
  height,
  index

}: SkeletonProps) {
  return (
    <span
      style={{ width: '100%', maxWidth: width ? width : '100%', height: height ? height : '100%', animationDelay: `${index ? index * 0.1 : 0}s` }}
      className={styles.skeleton_loader}
    >

    </span>
  )
}

export default Skeleton