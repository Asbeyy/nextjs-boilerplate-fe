import React from 'react'
import styles from './calendar.module.css'

interface HourLineProps {
    isToday: boolean
}

function HourLine({ isToday }: HourLineProps) {


    const calculateVerticalPositonBasedOnTime = () => {
        //If changed the tileHour height in CSS, change the TILE_HEIGHT constant
        const TILE_HEIGHT = 55
        const hours = new Date().getHours()
        const minutes = new Date().getMinutes()

        return (hours * TILE_HEIGHT) + ((minutes * TILE_HEIGHT) / 60)
    }

    if (!isToday) return null

    return (
        <div
            className={styles.hourLine}
            style={{
                top: calculateVerticalPositonBasedOnTime()
            }}
        >
            <div className={styles.dot} />
            <div className={styles.line} />
        </div>
    )
}

export default HourLine