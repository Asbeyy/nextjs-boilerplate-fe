import { Plus } from 'lucide-react'
import styles from './title.module.css'
import React from 'react'


function Title(props: { title: string, subtitle?: string, buttonPlus?: boolean, onClick?: () => void, isLoading?: boolean, textColor?: string }) {


    if (props.isLoading) {
        return (
            <div className={styles.containerTitle}>
                <div>
                    <p className={styles.titleSkeleton}>&nbsp;</p>
                    {
                        props.subtitle &&
                        <p className={styles.subtitle}>{props.subtitle}</p>
                    }
                </div>
                {
                    props.buttonPlus &&
                    <Plus width={18} />
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
                props.buttonPlus &&
                <p>+</p>
            }
        </div>
    )
}

export default Title