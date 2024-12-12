import React, { useEffect } from 'react'
import styles from './globals.module.css'


interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    width?: any
}

function Modal({ isOpen, onClose, children, width }: ModalProps) {

    const initialPosition = {
            width: width ? `${width}` : '700px',
        transform: 'translateY(30px)',
        opacity: 0
    }
    const finalPosition = {
        width: width ? `${width}` : '700px',
        transform: 'translateY(0px)',
        opacity: 1
    }

    const [isFinalPosition, setIsFinalPosition] = React.useState(false)

   


    useEffect(() => {
        
        setTimeout(() => {
           setIsFinalPosition(true)
        }, 1)

    }, [isOpen])



  return (
    <div onClick={onClose} className={styles.modal}>  
        <div
            onClick={(e)=> {e.stopPropagation()}} 
            className={styles.containerElements}
            style={isFinalPosition ? finalPosition : initialPosition}
        >
            {children}
        </div>
    </div>
  )
} 

export default Modal

