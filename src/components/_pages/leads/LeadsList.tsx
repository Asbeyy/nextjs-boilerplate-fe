import React from 'react';
import Table from '@/components/tables/Table';
import TableCard from '@/components/tables/TableCard';
import TableCardHeader from '@/components/tables/TableCardHeader';
import TableHeaderContainer from '@/components/tables/TableHeaderContainer';
import { Download } from 'lucide-react';
import { getAllLeads } from '@/services/api';
import toast from 'react-hot-toast';
import Input from '@/components/inputs/input';
import Searchbar from '@/components/inputs/inputSearch';
import NoUsers from '@/components/404/NoUsers';
import TableCardSkeleton from '@/components/tables/TableCardSkeleton';
import InputSelect from '@/components/inputs/inputSelect';
import ModalLead from '@/components/modals/ModalLead';

function LeadsList() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [loading, setLoading] = React.useState(true);
    const [leads, setLeads] = React.useState<any>([]);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(20);
    const [search, setSearch] = React.useState('');
    const [filter, setFilter] = React.useState('');
    const [leadId, setLeadId] = React.useState<string | null>(null);
    const [scrollPosition, setScrollPosition] = React.useState<number>(0);

    const [filterOptions] = React.useState([
        { value: 'all', label: 'All' },
        { value: 'pending', label: 'Pending' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'retry', label: 'Retry' },
        { value: 'accepted', label: 'Accepted' },
    ]);

    const fetchLeads = async (page: number) => {
        setLoading(true);
        if (containerRef.current) {
            console.log('Setting scroll position to:', containerRef.current.scrollTop);
            setScrollPosition(containerRef.current.scrollTop);
        }
        const call = await getAllLeads(page, limit, search, filter);
        if (call.success) {
            console.log(call.data)
            setLeads((prev: any) => [...prev, ...call.data]);
        } else {
            toast.error(call.message);
        }

        setLoading(false);
        containerRef.current?.scrollTo(0, scrollPosition); // Restore scroll position
    };
    const onSearch = async (value: string, filter: string) => {
        setLoading(true);
        const call = await getAllLeads(page, limit, value, filter);
        if (call.success) {
            setLeads(call.data);
        } else {
            toast.error(call.message);
        }

        setLoading(false);
    }
    const toggleLeadModal = (leadId?: string) => {
        if (leadId) {
            setLeadId(leadId);
        } else {
            setLeadId(null);
        }
    };
    const handleScroll = () => {
        if (leads.length < 5) return;
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current || {};
        if (!clientHeight || !scrollHeight || !scrollTop) return;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            if (loading) return;
            setPage(prevPage => prevPage + 1);
        }
    };

    React.useEffect(() => {
        fetchLeads(page);
    }, [page, limit]); // Dependencies
    React.useEffect(() => {
        onSearch(search, filter);
    }, [search, filter]); // Dependencies
    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = scrollPosition; // Restore scroll position
        }
    }, [leads]); // Dependency for maintaining scroll position after data update

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
                <div className='w-[150px]' style={{ transform: 'translateY(7px)' }}>
                    <InputSelect
                        options={filterOptions}
                        placeholder='Status'
                        value={filter || ''}
                        onSelect={(value: string) => setFilter(value)}
                        style={{ paddingLeft: '10px' }}
                    />
                </div>
            </div>

            {/* Table Head */}
            <TableHeaderContainer>
                <TableCardHeader
                    main='Name'
                    others={['City','Business', 'Status']}
                    isDownloadAvailable={false}
                />
            </TableHeaderContainer>

            {/* Table Data */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                style={{
                    height: 'calc(100vh - 350px)',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For Internet Explorer and Edge
                }}
                className="no-scrollbar" // For Webkit browsers
            >
                {!loading && leads.length > 0 ? (
                    leads.map((lead: any, index: number) => (
                        <TableCard
                            key={index}
                            main={lead.name}
                            others={[lead.address.split(',')[2].trim().replace(/^\d{5}/, "") ,lead.type, lead.status]}
                            srcImg={'/icons/google.jpg'}
                            onClick={() => {
                                toggleLeadModal(lead._id);
                            }}
                        />
                    ))
                ) : !loading && leads.length === 0 ? (
                    <NoUsers />
                ) :
                    loading &&
                        leads.length === 0 ?
                        (
                            <div>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <TableCardSkeleton
                                        key={index}
                                        index={index}
                                        others={['', '']}
                                    />
                                ))}
                            </div>
                        )

                        :
                        loading &&
                        leads.length > 0 &&
                        leads.map((lead: any, index: number) => (
                            <TableCard
                                key={index}
                                main={lead.name}
                                others={[lead.address.split(',')[2].trim().replace(/^\d{5}/, "") ,lead.type, lead.status]}
                                srcImg={'/icons/google.jpg'}
                                onClick={() => {
                                    toggleLeadModal(lead._id);
                                }}
                            />
                        ))
                }
                {leadId && (
                    <ModalLead
                        isOpen={!!leadId}
                        onClose={() => toggleLeadModal()}
                        leadId={leadId}
                    />
                )}
            </div>
        </Table>
    );
}

export default LeadsList;
