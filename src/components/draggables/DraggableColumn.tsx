import React, { use, useEffect } from 'react'
import styles from './draggable.module.css'
import Title from '../titles/Title'
import { Plus } from 'lucide-react'
import { addTaskToProject } from '@/services/api'
import toast from 'react-hot-toast'

interface DraggableColumnProps {
    children: React.ReactNode
    name: string
    onMouseEnter: () => void
    onAddTask: (task: any) => void
    isDragging: boolean
    projectId: string
    status: string
}
function DraggableColumn({ children, name, onMouseEnter, onAddTask, isDragging, projectId, status }: DraggableColumnProps) {
    const [inputAddTask, setInputAddTask] = React.useState(false)
    const [task, setTask] = React.useState('')

    const toggleInputAddTask = () => {
        setInputAddTask(!inputAddTask)
    }
    const handleAddTask = async () => {
        const call = await addTaskToProject(projectId, task, status)
        
        
        if (call.success){
            toast.success('Task added')
            onAddTask(call.task)
            setTask('')
            setInputAddTask(false)
        } else {
            toast.error(call.message)
        }
    }


    useEffect(() => {
        if (inputAddTask) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    handleAddTask();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [inputAddTask, task])


  return (
    <div 
        className={styles.draggableColumn}
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            height: isDragging ? '100%' : 'auto' ,
        }}
        onMouseEnter={(e) => {
            onMouseEnter()
        }}
    >
        <Title
            title={name}
        />
        <div style={
            {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                pointerEvents: isDragging ? 'none' : 'all',
                width: '100%',
                overflowY: 'scroll',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                borderRadius: '10px',   
                paddingBottom: '10px',
                
            }
        }>
            {children}
            {
                isDragging && 
                <div className='w-[100%] h-[120px] flex items-center justify-center rounded-md'
                    style={{
                        border: '2px dashed #ffffff80',
                        cursor: 'pointer',
                    }}
                >
                    <Plus width={20}/>
                </div>
            }
            <div className='flex flex-row gap-2 items-center justify-center cursor-pointer w-full bg-[var(--card-background)]' style={{ fontSize: '14px', borderRadius: '20px', height: '40px' }}>
                
                {
                    inputAddTask ?
                    <input 
                        type="text"
                        placeholder='Type your task..' 
                        style={{ width: '100%', padding: '5px 10px', borderRadius: '20px', border: 'none', outline: 'none', height: '100%', background: 'none' }}
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        autoFocus
                    />
                    :
                    <div 
                        className='flex flex-row gap-2'
                        onClick={toggleInputAddTask}
                    >
                        <Plus width={16}/>
                        <p> New task </p>
                    </div>
                }
                
            </div>
        </div>
    </div>
  )
}

export default DraggableColumn