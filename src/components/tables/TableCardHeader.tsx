import React from 'react'

interface TableCardRowProps {
    main: string
    others: string[]

    isDownloadAvailable?: boolean
}

function TableCardHeader({ main, others, isDownloadAvailable }: TableCardRowProps) {
    return (
        <div className='flex items-center justify-between px-4 py-2'>
            <div className='flex items-center gap-2'>
                {/* <div style={{ width: '20px', height: '20px', background: '#ffffff50', borderRadius: '5px' }}></div> */}
                <p style={{ fontSize: '13px' }} className='mx-2'>{main}</p>
            </div>

            <div className='flex items-center justify-between gap-4'>
                {
                    others.map((other, index) => (
                        <p key={index} className='w-[100px]' style={{ fontSize: '13px' }}>{other}</p>
                    ))
                }
                
                {/* Space for the download button */}
                {
                    isDownloadAvailable &&
                    <p className='w-[120px]' style={{ fontSize: '13px' }}></p>
                }
            </div>
        </div>
    )
}

export default TableCardHeader