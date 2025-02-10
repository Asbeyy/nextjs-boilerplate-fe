import { Download } from 'lucide-react'
import React from 'react'

interface TableCardProps {
    main: string
    others: string[]
    srcImg?: string
    isDownloadAvailable?: boolean

    onClick?: () => void

}

function TableCard({ main, others, isDownloadAvailable, srcImg, onClick }: TableCardProps) {



    return (
        <div
            className={`w-full ${
                !isDownloadAvailable &&
                onClick &&
                'cursor-pointer'
            }`}
            onClick={() => {
                if (
                    !isDownloadAvailable &&
                    onClick
                ) {
                    onClick()
                }

            }}
        >

            <div className='flex items-center justify-between px-4 py-2' style={{ borderBottom: "1px solid #ffffff10" }}>
                <div className='flex items-center gap-2 h-[60px]'>
                    {/* <div style={{ width: '20px', height: '20px', background: '#ffffff50', borderRadius: '5px' }}></div> */}
                    <div className='flex items-center gap-2'>
                        <img 
                            src={srcImg ?? "/icons/pdf.svg"} className='mx-2' alt="" 
                            style={{
                                borderRadius: srcImg ? '50%' : '0px',
                                width: srcImg ? '40px' : '35px',
                                height: srcImg ? '40px' : '',
                                objectFit: srcImg ? 'cover' : 'contain',
                            }}

                        />
                        <p style={{ fontSize: '14px', fontWeight: '500' }}>{main}</p>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-4'>
                    {
                        others.map((other, index) => (
                            <p key={index} className='w-[100px]' style={{ fontSize: '14px' }}>{other}</p>
                        ))
                    }
                    {
                        isDownloadAvailable &&
                        onClick &&
                        <div className='flex items-center justify-center space-x-2 cursor-pointer h-[40px] w-[120px] rounded-[10px]' style={{ border: '1px solid #ffffff50' }}>
                            <Download width={16} />
                            <p style={{ fontSize: '14px' }}>Download</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TableCard