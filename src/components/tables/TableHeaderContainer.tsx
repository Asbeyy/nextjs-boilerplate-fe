import React from 'react'

interface TableHeaderContainerProps {
    children: React.ReactNode
}

function TableHeaderContainer({ children }: TableHeaderContainerProps) {
    return (
        <div className='w-full py-1' style={{ borderBottom: "1px solid #ffffff10" }}>
            {children}
        </div>
    )
}

export default TableHeaderContainer