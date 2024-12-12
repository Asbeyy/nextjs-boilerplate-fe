import React from 'react'
import styles from './calendar.module.css'

interface TileEventProps {
    name: string
    dateStart: string
    dateEnd: string

    _id?: string
    onClick?: () => void
}

function TileEvent({ name, dateStart, dateEnd, _id, onClick }: TileEventProps) {
    const TILE_HEIGHT = 55  // If changed in CSS the TileHour height, change here too


    const calculateHeightTile = (dateStart: string, dateEnd: string) => {
        //The height of the tile is calculated by the difference between the start and end hours (1h correspond to the full file height, thus 70px)
        const startHour = new Date(dateStart)
        const startMinutes = startHour.getMinutes()

        const endHour = new Date(dateEnd)
        const endMinutes = endHour.getMinutes()

        const start = startHour.getHours() + startMinutes / 60
        const end = endHour.getHours() + endMinutes / 60

        return end - start
    }
    const calculateVerticalPosition = (dateStart: string) => {
        //The vertical position of the tile is calculated by the start hour in minutes from midnight - Example 9am ( 9 * 70px ) consider also minutes
        const startHour = new Date(dateStart)
        const startMinutes = startHour.getMinutes()

        const yHours = startHour.getHours() * TILE_HEIGHT
        const yMinutes = (startMinutes * TILE_HEIGHT) / 60

        return `${yHours + yMinutes}`
    }

    return (
        <div
            onClick={onClick}
            className={styles.tileEvent}
            style={{
                top: `${calculateVerticalPosition(dateStart)}px`,
                height: `calc(${calculateHeightTile(dateStart, dateEnd)} * ${TILE_HEIGHT}px)`
            }}
        >
            <div>
                <p className={styles.eventName}>{name}</p>
                <p className={styles.eventTime}>
                    {
                        new Date(dateStart).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' - ' +
                        new Date(dateEnd).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                    }
                </p>
            </div>

        </div>
    )
}

export default TileEvent