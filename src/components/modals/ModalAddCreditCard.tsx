import React, { useEffect } from 'react'
import Modal from '../_globals/modal'
import Title from '../titles/Title'
import Input from '../inputs/input'
import CreditCard from '../cards/CreditCard'
import ButtonLoading from '../buttons/ButtonLoading'
import { formatCreditCardNumber } from '@/utils/formatStrings'
import { validateCreditCard } from '@/utils/algorithms'
import { addPaymentMethod } from '@/services/api'
import toast from 'react-hot-toast'

interface ModalAddCreditCardProps {
    isOpen: boolean
    onClose: () => void
}

function ModalAddCreditCard({ isOpen, onClose }: ModalAddCreditCardProps) {

    const [name, setName] = React.useState('')
    const [cardNumber, setCardNumber] = React.useState('')
    const [expiry, setExpiry] = React.useState('')
    const [cvc, setCvc] = React.useState('')

    const handleAddPaymentMethod = async () => {
        console.log(cardNumber, name, expiry, cvc)
        if (!cardNumber || !name || !expiry || !cvc) {
            toast.error('Please fill all fields')
            return
        }

        const call = await addPaymentMethod(cardNumber, name, expiry, cvc)

        if (call.success){
            onClose()
            toast.success('Payment method added')

            setTimeout(() => {
                window.location.reload()
            }, 1000)
            
        } else {
            toast.error(call.message)
        }

        return true
    }

    useEffect(() => {
        console.log(cardNumber)
    }, [cardNumber])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <Title
                isLoading={false}
                title={'Add payment method'}
                subtitle={'Add a new payment method'}
            />
            <div className='w-full flex flex-col gap-4 items-center pt-4'>
                <CreditCard
                    name={name}
                    number={cardNumber}
                    expiry={expiry}
                    type={validateCreditCard(cardNumber).cardType || ''}
                />

                <div className='mt-4 w-full'>
                    <Input
                        label='Name on card'
                        placeholder='John Doe'
                        type='text'
                        onChange={setName}
                        value={name}
                    />

                    <div className='flex flex-row gap-4'>

                        <div className='w-[60%]'>
                            <Input
                                label='Card number'
                                placeholder='0000 0000 0000 0000'
                                type='text'
                                onChange={(value)=>{
                                    if (value.length > 19) return
                                    setCardNumber(value)
                                }}
                                value={formatCreditCardNumber(cardNumber)}
                                rules={[
                                    { type: 'regex', value: /^\d{4} \d{4} \d{4} \d{4}$/, message: 'Card number invalid' }
                                ]}
                            />
                        </div>
                        <div className='w-[25%]'>
                            <Input
                                label='Expiry'
                                placeholder='12/24'
                                type='text'
                                onChange={setExpiry}
                                value={expiry}
                                rules={[
                                    { type: 'regex', value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Date invalid' }
                                ]}
                            />
                        </div>
                        <div className='w-[15%]'>
                            <Input
                                label='CVC'
                                placeholder='CVC'
                                type='text'
                                onChange={(value)=> {
                                    if (value.length > 3) return

                                    setCvc(value)
                                }}
                                value={cvc}
                            />
                        </div>
                    </div>

                    <br />
                    <ButtonLoading
                        text='Add payment method'
                        onClick={() =>{
                            return handleAddPaymentMethod()
                        }}
                        color='white'
                        backgroundColor='var(--status-background)'
                    />
                </div>


            </div>
        </Modal>
    )
}

export default ModalAddCreditCard