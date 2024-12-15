import { Plus } from 'lucide-react'
import styles from './title.module.css'
import React, { act, CSSProperties } from 'react'
import Skeleton from '../loaders/Skeleton'


function Title(props: {style?: CSSProperties ,title?: string, subtitle?: string, actionRight?: React.ReactNode , onClick?: () => void, isLoading?: boolean, textColor?: string }) {



    if (props.isLoading) {
        return (
            <div className={styles.containerTitle}>
                <div className='flex flex-col gap-[7px]'>
                    <div className='flex items-center justify-center w-[170px] h-[24px]'>
                        <Skeleton/>
                    </div>
                    {
                        props.subtitle &&
                        <div className='flex items-center justify-center w-[130px] h-[20px]'>
                            <Skeleton/>
                        </div>
                    }
                </div>
                

            </div>
        )
    }

    return (
        <div className={styles.containerTitle} style={props.style}>
            <div>
                <p className={styles.title} style={{
                    color: props.textColor ? props.textColor : 'white'
                }}>
                    <span
                        style={{
                            opacity: props.isLoading ? 0 : 1
                        }}
                    >
                        {   props.title &&
                            props.title
                        }
                    </span>
                </p>
                {
                    props.subtitle &&
                    <p className={styles.subtitle}>{props.subtitle}</p>
                }
            </div>
            {
                props.actionRight &&
                props.actionRight
            }
        </div>
    )
}

export default Title