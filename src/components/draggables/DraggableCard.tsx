import React from 'react'
import styles from './draggable.module.css'
import { BookText } from 'lucide-react'


interface DraggableCardProps {
    onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
    onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
    
    taskId: string
    selected: boolean | null
    cardCordinates: { x: number, y: number }
    isDragging: boolean
    style?: React.CSSProperties

    title?: string
    description?: string
    dueDate?: string
}

function DraggableCard({ onMouseDown, onMouseUp, selected, cardCordinates, isDragging, style, title, description, dueDate, taskId }: DraggableCardProps) {
    return (
        <div
            className={styles.draggableCard}
            style={{
                position: selected && isDragging ? 'absolute' : 'relative',
                top: selected && isDragging ? cardCordinates.y : 0,
                left: selected && isDragging ? cardCordinates.x : 0,
                zIndex: selected ? 20000 : 10000,
                transform: selected ? 'rotate(5deg)' : 'rotate(0deg)',
                ...style,
            }}
            
            onMouseDown={(e) => {
                onMouseDown &&
                    onMouseDown(e)
            }}
            onMouseUp={(e) => {
                onMouseUp &&
                    onMouseUp(e)
            }}
        >
            <div className='flex flex-col'>
                <div className={styles.bannerTask}>
                    <p className={styles.p}>
                        TASK - {taskId}
                    </p>
                </div>
                {title}
            </div>

            {
                description &&
                <div>
                    <BookText width={16} />
                </div>
            }
        </div>
    )
}

export default DraggableCard