import React from 'react'
import styles from './calendar.module.css'
import TileHour from './TileHour'

function VerticalHours() {

    function formatHourTo12Hour(hour: number): string {
        if (hour < 0 || hour > 23) {
          throw new Error("Hour must be between 1 and 24.");
        }
      
        const isMidnight = hour === 24 || hour === 0;
        const isNoon = hour === 12;
      
        const formattedHour = isMidnight ? 12 : isNoon ? 12 : hour % 12 || 12;
        const meridiem = hour < 12 || isMidnight ? "AM" : "PM";
      
        return `${formattedHour} ${meridiem}`;
      }
      

      
  return (
    <div className={styles.verticalHours}>
        {
            //create empty array of 24
            Array.from({ length: 24 }).map((_, index) => {
                return (
                    <TileHour key={index}>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                paddingRight: '8px',
                                borderBottom: '.5px solid #ffffff48'
                            }}
                        >
                            <p style={{
                                margin: 0,
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#ffffffe2',
                                width: '100%',
                                textAlign: 'center',
                                transform: 'translateY(-8px)',
                                background: 'rgba(25,26,26)'
                            }}>
                                {
                                    index === 0 ? '' :
                                    formatHourTo12Hour(index)
                                }
                            </p>
                        </div>
                    </TileHour>
                )
            })
        }
        
    </div>
  )
}

export default VerticalHours