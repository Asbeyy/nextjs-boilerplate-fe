import React from 'react'
import styles from './loder.module.css'


interface SkeletonProps {
  width?: string
  height?: string
  index?: number
}

function SkeletonRound({
  width,
  height,
  index
}: SkeletonProps) {
  return (
    <span style={{width: width ? width : '100%', height: height ? height : '100%', borderRadius: '50%', animationDelay: `${index ? index * 0.01 : 0}s` }} className={styles.skeleton_loader}></span>
  )
}

export default SkeletonRound