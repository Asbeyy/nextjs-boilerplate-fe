import React, { useEffect } from 'react'
import Modal from '../_globals/modal'
import Title from '../titles/Title'
import { getLead, updateLeadEmail, updateLeadStatus } from '@/services/api'
import toast from 'react-hot-toast'
import CardAlert from '../cards/CardAlert'
import ButtonLoading from '../buttons/ButtonLoading'
import { Divide, Map, MapPin, PhoneIcon } from 'lucide-react'
import { on } from 'events'
import Input from '../inputs/input'

interface ModalLeadProps {
    isOpen: boolean
    onClose: () => void
    leadId: string
}

function ModalLead({ isOpen, onClose, leadId }: ModalLeadProps) {
    const [lead, setLead] = React.useState<any>(null)
    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(true)

    const handleFetchLead = async () => {
        setLoading(true)
        const call = await getLead(leadId)

        if (call.success) {
            console.log(call.data)
            setLead(call.data)
            setEmail(call.data.email)
        } else {
            toast.error(call.message)
        }

        setTimeout(() => {
            setLoading(false)
        }, 200)
    }
    const handleUpdateLeadStatus = async (status: string) => {

        const call = await updateLeadStatus(leadId, status)

        if (call.success) {
            toast.success(call.message)
            setLead(call.data)
            if (status === 'accepted') {
                //go to new account page
            }

        } else {
            toast.error(call.message)
        }
    }
    const handleUpdateLeadEmail = async (email: string) => {
        if (email === '') return toast.error('Please enter an email')
        const call = await updateLeadEmail(leadId, email)

        if (call.success) {
            toast.success(call.message)
        } else {
            toast.error(call.message)
        }
    }


    useEffect(() => {
        if (leadId){
            handleFetchLead()
        }
    }, [leadId])
  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <Title
            title={'Lead Details'}
            subtitle={'You can see the details and track the lead status'}
            actionRight={
                <div
                    style={{
                        backgroundColor: lead && lead.status === 'Pending' ? 'gray' : lead && lead.status === 'Contacted' ? '#4CAF50' : lead && lead.status === 'Rejected' ? '#F44336' : lead && lead.status === 'Retry' ? '#FFC107' : lead && lead.status === 'Accepted' ? '#2196F3' : 'gray',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '14px'
                    }}
                >
                    {
                        lead &&
                        lead.status
                    }
                </div>
            }
        />
        <div className='w-full flex items-start justify-center flex-col gap-1' style={{fontSize: '14px'}}>
            <div className='w-full flex justify-between'><span>Name</span><span>{lead && lead.name}</span></div>
            <a 
                className='w-full flex justify-between'
                href={`https://www.google.com/maps/search/?q=${lead && lead.address},${lead && lead.name}`}
                target='_blank'
            >
                <span>Phone  </span><span className='flex flex-row gap-2'>{lead && lead.phone} <PhoneIcon width={18}/></span>
            </a>
            <a 
                className='w-full flex justify-between'
                href={`https://www.google.com/maps/search/?q=${lead && lead.address},${lead && lead.name}`}
                target='_blank'
            >
                <span>Address  </span><span className='flex flex-row gap-2' style={{ color: '#007BFF'}}>{lead && lead.address} <MapPin width={18}/></span>
            </a>
            
            <div className='w-full flex justify-between items-center'>
                <span>Email</span>
                <div className='w-[60%]'>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e)}
                        placeholder='Enter email'
                    />
                </div>
            </div>
            
            <ButtonLoading
                text={'Update Email'}
                backgroundColor='#007BFF'
                color='white'
                onClick={() => {
                    return handleUpdateLeadEmail(email)
                }}
            />
        </div>



        <div className='flex flex-col w-full gap-1'>
            {
                lead &&
                lead.status !== 'accepted' &&
                <>
                    <CardAlert
                        title='Status'
                        message='By changing the status, you can track the lead progress'
                        color='orange'
                        style={{marginTop: '20px', marginBottom: '20px'}}
                    />
                    <ButtonLoading
                        text='Pending'
                        backgroundColor='gray'
                        color='white'
                        onClick={() => {
                            return handleUpdateLeadStatus('pending')
                        }}
                    />
                    <ButtonLoading
                        text='Contacted'
                        backgroundColor='#4CAF50'
                        color='white'
                        onClick={() => {
                            return handleUpdateLeadStatus('contacted')
                        }}
                    />
                    <ButtonLoading
                        text='Rejected'
                        backgroundColor='#F44336'
                        color='white'
                        onClick={() => {
                            return handleUpdateLeadStatus('rejected')
                        }}
                    />
                    <ButtonLoading
                        text='Retry'
                        backgroundColor='#FFC107'
                        color='white'
                        onClick={() => {
                            return handleUpdateLeadStatus('retry')
                        }}
                    />
                    <ButtonLoading
                        text='Accepted'
                        backgroundColor='#2196F3'
                        color='white'
                        onClick={() => {
                            return handleUpdateLeadStatus('accepted')
                        }}
                    />
                </>
            }
            
            
            <CardAlert
                title='Delete Lead'
                message='Are you sure you want to delete this lead? This action is irreversible'
                color='red'
                style={{marginTop: '20px', marginBottom: '20px'}}
            />
            <ButtonLoading
                text='Delete'
                backgroundColor='tomato'
                color='white'
                onClick={() => {}}
            />
        </div>

    </Modal>
  )
}

export default ModalLead