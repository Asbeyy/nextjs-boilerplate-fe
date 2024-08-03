import React, { useEffect } from 'react'
import styles from './toast.module.css'

function ConfirmMessage({message}: {message: string}) {

    const [position, setPosition] = React.useState(-60)

    useEffect(() => {
        setPosition(20)
    },[])


  return (
    <div className={styles.confirmMessage} style={{bottom: `${position}px`}}> 
        {message}
    </div>
  )
}

export default ConfirmMessage