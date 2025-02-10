import React, { useEffect } from 'react'
import Modal from '../_globals/modal'
import Title from '../titles/Title'
import { getAllPaymentMethods, updatePaymentMethodDefault } from '@/services/api'
import toast from 'react-hot-toast'
import { Mail } from 'lucide-react'
import { on } from 'events'
import NoCreditCards from '../404/NoCreditCards'
import Card from '../cards/Card'
import Skeleton from '../loaders/Skeleton'


interface Props {
    isOpen: boolean
    onClose: () => void
    currentPaymentMethodId: string
    quantityPaymentMethods: number
}

function ModalAllPaymentMethods({ isOpen, onClose, currentPaymentMethodId, quantityPaymentMethods }: Props) {
    const [paymentMethods, setPaymentMethods] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPaymentMId, setCurrentPaymentMId] = React.useState(currentPaymentMethodId)

    const handleFetchAllPaymentMethods = async () => {
        setIsLoading(true)
        const call = await getAllPaymentMethods()

        if (call.success) {
            console.log(call.data)
            setPaymentMethods(call.data)
        } else {
            toast.error('Failed to fetch payment methods')
        }

        setIsLoading(false)
    }
    const handleSelectDefaultPaymentMethod = async (paymentMethodId: string) => {
        const call = await updatePaymentMethodDefault(paymentMethodId)

        if (call.success) {
            toast.success('Default payment method updated')
            onClose()

            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {
            toast.error('Failed to update default payment method')
        }
    }

    useEffect(() => {
        handleFetchAllPaymentMethods()
    }, [])


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Title
                isLoading={false}
                title={'All payment methods'}
                subtitle={'Manage your payment methods & select your default payment method'}
            />

            <div className='w-full gap-2 flex flex-col'>

                {
                            !isLoading &&
                            paymentMethods.length > 0 ?
                            paymentMethods.map((currentCardData: any) => {
                                return (
                                    <div key={currentCardData.id} className='w-full flex flex-row gap-4' style={{ background: "var(--status-background)", padding: "15px", borderRadius: "10px" }}>
                                        {/* Logo Payment Provider */}
                                        <div>
                                            {
                                                currentCardData.card.brand === 'visa' ?
                                                    <div className='flex bg-[#121212] w-[70px] h-[40px] rounded-[10px] items-center justify-center'>
                                                        <img src="/icons/visa.png" style={{ scale: 0.6 }} alt="" />
                                                    </div>
                                                    :
                                                    <div className='flex bg-[#ffffff] w-[70px] h-[40px] rounded-[10px] items-center justify-center'>
                                                        <img src="/icons/mastercard.svg" style={{ scale: 0.6 }} alt="" />
                                                    </div>
                                            }

                                          

                                        </div>

                                        {/* Info Billing */}
                                        <div className='w-[100%] flex flex-col'>
                                            <p style={{ fontSize: '13px', fontWeight: '500' }}>Card ending in {currentCardData?.card.last4}</p>
                                            <p style={{ fontSize: '14px', fontWeight: '300', color: "#ffffff80" }}>Expiry {currentCardData?.card.exp_month}/{currentCardData?.card.exp_year}</p>

                                            <div className='flex flex-row gap-2 items-center mt-2'>
                                                <Mail width={18} style={{ color: "#ffffff80" }} />
                                                <p style={{ fontSize: '13px', fontWeight: '300', color: "#ffffff80" }}>{currentCardData?.billing_details.email === null ? 'Please add a billing address' : currentCardData?.billing_details.email}</p>
                                            </div>

                                        </div>

                                        {
                                            currentPaymentMethodId === currentCardData.id ?
                                                <div className='w-[70px] h-full flex justify-start'>
                                                    <p style={{ fontSize: '14px', textAlign: 'end', width: '100%', background: 'tomato', padding: '2px 10px', borderRadius: '20px' }}>Default</p>
                                                </div>
                                                :
                                                <div className='w-[70px] h-full flex justify-start' onClick={() => handleSelectDefaultPaymentMethod(currentCardData.id)}>
                                                    <p style={{ fontSize: '14px', textAlign: 'end', width: '100%', cursor: 'pointer', border: '1px solid #ffffffa1', padding: '2px 10px', borderRadius: '20px', }}>Select</p>
                                                </div>
                                        }
                                    </div>
                                )
                            })
                            :
                            !isLoading &&
                            paymentMethods.length === 0 ?
                                <div className='w-full flex justify-center'>
                                    <NoCreditCards
                                        onNewPaymentMethod={onClose}
                                    />
                            </div>
                            :
                            isLoading &&
                            Array.from({ length: quantityPaymentMethods ? quantityPaymentMethods : 2 }).map((_, i) => {
                                return (
                                    <Card key={i} style={{ width: '100%', padding: '20px' }}>
                                        <div className='w-full h-[63px] flex items-center justify-center'>
                                            <Skeleton />
                                        </div>
                                    </Card>
                                )
                            })
                }
            </div>

        </Modal>
    )
}

export default ModalAllPaymentMethods