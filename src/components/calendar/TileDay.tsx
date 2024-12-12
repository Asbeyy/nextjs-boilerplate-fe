import React from 'react'
import styles from './calendar.module.css'
import TileHour from './TileHour'
import TileEvent from './TileEvent'
import HourLine from './HourLine'
import { useRouter } from 'next/navigation'


interface TileDayProps {

    dayTile: Date, // what day the tile is representing - Date
    events: { // events that are happening on that day
        dateStart: string,
        dateEnd: string,
        name: string,
        _id?: string
    }[]
}

function TileDay({ dayTile, events }: TileDayProps) {
    const router = useRouter()

    //check if tile day rendered is today
    const day = dayTile.getDate()
    const currentDay = new Date().getDate()
    const isToday = day === currentDay


    return (
        <div className={styles.tileDay}>
            {
                //create empty array of 24
                Array.from({ length: 24 }).map((_, index) => {
                    return (
                        <TileHour
                            key={index}
                        >
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    borderBottom: '.5px solid #ffffff48',
                                    borderLeft: '.5px solid #ffffff48'
                                }}
                            >
                                
                            </div>
                        </TileHour>
                    )
                })
            }


            {
                events.map(event => {
                    return (
                        <TileEvent
                            key={event._id}
                            name={event.name}
                            dateStart={event.dateStart}
                            dateEnd={event.dateEnd}

                            _id={event._id}
                            onClick={() => { 
                                router.push(`/admin/reservation/${event._id}`)
                            }}
                        />
                    )
                })
            }

            <HourLine
                isToday={isToday}
            />

        </div>
    )
}

export default TileDay