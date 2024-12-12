import { Plus } from 'lucide-react'
import styles from './title.module.css'
import React, { act } from 'react'


function Title(props: { title: string, subtitle?: string, actionRight?: React.ReactNode , onClick?: () => void, isLoading?: boolean, textColor?: string }) {


    if (props.isLoading) {
        return (
            <div className={styles.containerTitle}>
                <div>
                    <p className={styles.titleSkeleton}>&nbsp;</p>
                    {
                        props.subtitle &&
                        <p className={styles.subtitleSkeleton}>&nbsp;</p>
                    }
                </div>
                {
                    props.actionRight &&
                    props.actionRight
                }
            </div>
        )
    }

    return (
        <div className={styles.containerTitle}>
            <div>
                <p className={styles.title} style={{
                    color: props.textColor ? props.textColor : 'white'
                }}>
                    <span
                        style={{
                            opacity: props.isLoading ? 0 : 1
                        }}
                    >{props.title}</span>
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