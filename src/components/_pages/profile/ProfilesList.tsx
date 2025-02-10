import React from 'react'



import Table from '@/components/tables/Table'
import TableCard from '@/components/tables/TableCard'
import TableCardHeader from '@/components/tables/TableCardHeader'
import TableHeaderContainer from '@/components/tables/TableHeaderContainer'
import { Download } from 'lucide-react'
import { getAllProfiles } from '@/services/api'
import toast from 'react-hot-toast'
import Input from '@/components/inputs/input'
import Searchbar from '@/components/inputs/inputSearch'
import NoUsers from '@/components/404/NoUsers'
import TableCardSkeleton from '@/components/tables/TableCardSkeleton'
import InputSelect from '@/components/inputs/inputSelect'


function ProfilesList() {
    const [loading, setLoading] = React.useState(true)
    const [profiles, setProfiles] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [search, setSearch] = React.useState('')
    const [filter, setFilter] = React.useState('')

    const [filterOptions] = React.useState([
        { value: 'all', label: 'All' },
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
        { value: 'operator', label: 'Developer' },
    ])

    const fetchProfiles = async (page: number, filter: string) => {
        setLoading(true)
        const call = await getAllProfiles(page, limit, '', filter)
        console.log(call.data)
        if (call.success) {
            setProfiles(call.data)
        } else {
            toast.error(call.message)
        }

        setTimeout(() => {
            setLoading(false)
        }, 700)
    }
    const onSearch = async (value: string, filter: string) => {
        setLoading(true)

        const call = await getAllProfiles(1, limit, value, filter)
        if (call.success) {
            setProfiles(call.data)
        } else {
            toast.error(call.message)
        }

        setTimeout(() => {
            setLoading(false)
        }, 700)

    }

    
    React.useEffect(() => {
        fetchProfiles(page, filter)
    }, [page, limit])
    React.useEffect(() => {
        
        setPage(1)
        onSearch(search, filter)
    }, [search, filter])




    return (
        <Table>
            <div className='flex flex-row items-center mb-4 mt-3 justify-between w-full'>
                <div className='w-[400px]'>
                    <Searchbar
                        placeholder={'Search Name or Email'}
                        onSearch={(value: string) => setSearch(value)}
                        isSearching={loading}
                    />
                </div>
                <div className='w-[150px]' style={{transform: 'translateY(7px)'}}>
                    <InputSelect
                        options={filterOptions}
                        placeholder='Filter'
                        value={filter || ''}
                        onSelect={(value: string) => setFilter(value)}
                        style={{paddingLeft: '10px'}}
                    />
                </div>
            </div>

            {/* Table Head */}
            <TableHeaderContainer>
                <TableCardHeader
                    main='Name'
                    others={['Role']}
                    isDownloadAvailable={false}
                />
            </TableHeaderContainer>

            {/* Table Data */}
            {
                !loading &&
                profiles.length > 0 ?
                profiles.map((profile: any, index: number) => (
                    <TableCard
                        key={index}
                        main={`${profile.user.name} ${profile.user.surname}`}
                        others={[, profile.user.type.toUpperCase()]}
                        srcImg={profile.user.profile_picture != '' ? profile.user.profile_picture : '/fallbacks/profile_picture.jpg'}
                        onClick={() => {
                            //Go to user profile

                        }}
                    />
                ))
                :
                !loading &&
                profiles.length === 0 ?
                <NoUsers/>
                :
                loading &&
                <div>
                    {
                        Array.from({ length: 10 }).map((_, index) => {
                            return(
                                <TableCardSkeleton
                                    key={index}
                                    index={index}
                                    others={['']}
                                />
                            )
                        })
                    }
                </div>
            }

        </Table>
    )
}

export default ProfilesList