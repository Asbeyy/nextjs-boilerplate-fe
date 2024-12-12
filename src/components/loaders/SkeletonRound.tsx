import React from 'react'
import styles from './loder.module.css'


interface SkeletonProps {
  width?: string
  height?: string
}

function SkeletonRound({
  width,
  height
}: SkeletonProps) {
  return (
    <span style={{width: width ? width : '100%', height: height ? height : '100%', borderRadius: '50%'}} className={styles.skeleton_loader}></span>
  )
}

export default SkeletonRound