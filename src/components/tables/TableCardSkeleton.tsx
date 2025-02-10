import { Download } from 'lucide-react'
import React from 'react'
import Skeleton from '../loaders/Skeleton'
import SkeletonRound from '../loaders/SkeletonRound'

interface TableCardProps {
    others: string[]
    index?: number
}

function TableCardSkeleton({ others, index }: TableCardProps) {



    return (
        <div
            className={`w-full`}
            
        >

            <div className='flex items-center justify-between px-4 py-2' style={{ borderBottom: "1px solid #ffffff10" }}>
                <div className='flex items-center gap-2 h-[60px]'>
                    {/* <div style={{ width: '20px', height: '20px', background: '#ffffff50', borderRadius: '5px' }}></div> */}
                    <div className='flex items-center gap-2'>
                        <div
                            
                            style={{
                                borderRadius:  '50%',
                                width:  '40px',
                                height:  '40px',
                            }}
                            className='flex items-center justify-center'

                        >
                            <SkeletonRound
                                index={index}
                                />
                        </div>
                        <div style={{ height: '20px', width: '200px'}} className='flex items-center justify-center'>
                            <Skeleton
                                index={index}
                            />
                        </div>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    {
                        others.map((other, index) => (
                            <div key={index} style={{ height: '20px', width: '100px'}} className='flex items-center justify-center'>
                            <Skeleton
                                index={index}
                            />
                        </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TableCardSkeleton