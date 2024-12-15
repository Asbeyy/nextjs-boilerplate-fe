import React from 'react'
import styles from './table.module.css'
import Title from '../titles/Title'
import { Download } from 'lucide-react'
import TableCard from './TableCard'

interface TableProps {
    children: React.ReactNode
    title?: string
    subtitle?: string
    actionRight?: React.ReactNode
}

function Table({ children, title, subtitle, actionRight }: TableProps) {
    return (
        <div className='w-full mt-8'>
            <Title
                isLoading={false}
                title={title}
                subtitle={subtitle}
                actionRight={actionRight}
            />

            {/* Table Body */}
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default Table