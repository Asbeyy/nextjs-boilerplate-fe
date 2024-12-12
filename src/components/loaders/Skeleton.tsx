import React from 'react'
import styles from './loder.module.css'


interface SkeletonProps {
  width?: string
  height?: string
}

function Skeleton({
  
  width,
  height
}: SkeletonProps) {
  return (
    <span style={{width: '100%', maxWidth: width ? width : '100%', height: height ? height : '100%'}} className={styles.skeleton_loader}></span>
  )
}

export default Skeleton