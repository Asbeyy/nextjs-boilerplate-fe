import React from 'react'
import Modal from '../_globals/modal'
import Title from '../titles/Title'
import Input from '../inputs/input'
import ButtonLoading from '../buttons/ButtonLoading'
import CardAlert from '../cards/CardAlert'
import toast from 'react-hot-toast'
import { removePaymentMethod, updatePaymentMethodEmail } from '@/services/api'

interface ModalEditPaymentMethodProps {
    isOpen: boolean
    onClose: () => void
    paymentMethodId: string
    email: string | null
    name: string | null
}

function ModalEditPaymentMethod({ isOpen, onClose, paymentMethodId, name, email }: ModalEditPaymentMethodProps) {

    const [newEmail, setNewEmail] = React.useState(email)

    const handleEditBillingDetails = async () => {
        if (!newEmail) {
          toast.error('Please enter a valid email')
          return false
        }

        const call = await updatePaymentMethodEmail(paymentMethodId, newEmail)
  
        if (call.success) {
          
          toast.success(call.message);
        } else {
          toast.error(call.message);
        }
  
        return true
    }
    const handleDeletePaymentMethod = async () => {
        if (!paymentMethodId) {
            toast.error('An error occurred, please try again')
            return false
        }

        const call = await removePaymentMethod(paymentMethodId)

        if (call.success) {
            toast.success(call.message);
            onClose()
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {
            toast.error(call.message);
        }
    }

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
    >
        <Title
            isLoading={false}
            title={'Edit payment method'}
            subtitle={'Change info such as email, or address'}
        />
        <CardAlert
            title='Warning'
            message='Changing your billing info will change the email and address for future payments and invoices.'
            color='yellowgreen'
            style={{
                marginBottom: '20px'
            }}
        />

        <div className='w-full' style={{borderBottom: '1px solidrgba(224, 224, 224, 0.34)', paddingBottom: '20px'}}>
            <Input
                label='Billing email'
                value={newEmail || ''}
                onChange={setNewEmail}

            />
            <ButtonLoading
                text='Save changes'
                backgroundColor='yellowgreen'
                color='white'
                onClick={() => {
                    return handleEditBillingDetails()
                }}
            />
        </div>
        
        <div className='w-full mt-6'>
            <Title
                title='Delete Card'
                subtitle='This will remove this payment method from your account'
            />
            <CardAlert
                title='Irreversible action'
                message='This action is irreversible, are you sure you want to delete this payment method?'
                color='red'
                style={{
                    marginBottom: '20px'
                }}
            />
            <ButtonLoading
                text='DELETE CARD'
                backgroundColor='tomato'
                color='white'
                onClick={() => {
                    return handleDeletePaymentMethod()
                }}
            />
        </div>

    </Modal>
  )
}

export default ModalEditPaymentMethod