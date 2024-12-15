import React, { CSSProperties } from 'react'
import styles from './card.module.css'
import Link from 'next/link'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

interface CardAlertProps {
    color: string,
    title: string,
    message: string,
    buttonText?: string,
    buttonClick?: () => void,
    learnMoreLink?: string,
    style?: CSSProperties
}

function CardAlert({ color, title, message, buttonText, buttonClick, learnMoreLink, style }: CardAlertProps) {
  return (
    <div className={styles.containerCardAlert} style={style}>
        <div className={styles.cardAlert} style={{
            borderColor: color,
        }}>
            <div className={styles.iconContainer}>
                <InformationCircleIcon
                    className={styles.icon}
                    style={{
                        color: color,
                        strokeWidth: 2
                    }}
                />
            </div>
            <div className={styles.info}>
                <p className={styles.title}>{title || 'Title'}</p>
                <p className={styles.message}>{message || 'Message'} 
                    &nbsp;
                    {
                        learnMoreLink &&
                        <Link className={styles.link} href={learnMoreLink || '/'}>
                            Learn more
                        </Link>
                    }
                </p>
            </div>
            {
                buttonText &&
                <div className={styles.button} onClick={buttonClick}>
                    {
                        buttonText || 'Button'
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default CardAlert