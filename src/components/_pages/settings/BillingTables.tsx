import Table from '@/components/tables/Table'
import TableCard from '@/components/tables/TableCard'
import TableCardHeader from '@/components/tables/TableCardHeader'
import TableHeaderContainer from '@/components/tables/TableHeaderContainer'
import { Download } from 'lucide-react'
import React from 'react'

function BillingTables() {
    return (
        <Table
            style={{marginTop: '30px'}}
            title='Invoices'
            subtitle='View your billing history'
            actionRight={
                <div className='flex items-center justify-center space-x-2 cursor-pointer bg-[var(--background)] h-[40px] w-[160px] rounded-[10px]'>
                    <Download width={16} />
                    <p style={{ fontSize: '14px' }}>Download all</p>
                </div>
            }
        >
            {/* Table Head */}
            <TableHeaderContainer>
                <TableCardHeader
                    main='Invoice'
                    others={['Date', 'Amount']}
                    isDownloadAvailable={true}
                />
            </TableHeaderContainer>

            {/* Table Data */}
            <TableCard
                main='Invoice #1234'
                others={['12/12/2021', '$200']}
                isDownloadAvailable={true}
            />
            <TableCard
                main='Invoice #1234'
                others={['12/12/2021', '$200']}
                isDownloadAvailable={true}
            />
            <TableCard
                main='Invoice #1234'
                others={['12/12/2021', '$200']}
                isDownloadAvailable={true}
            />
        </Table>
    )
}

export default BillingTables