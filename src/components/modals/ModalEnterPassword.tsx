import React from 'react'
import Modal from '../_globals/modal'
import Title from '../titles/Title'
import InputHidden from '../inputs/inputHidden'
import ButtonLoading from '../buttons/ButtonLoading'
import CardAlert from '../cards/CardAlert'

interface ModalEnterPasswordProps {
    description?: string
    isOpen: boolean
    onClose: () => void
    onConfirm: (password: string) => void
}

function ModalEnterPassword({ description, isOpen, onClose, onConfirm }: ModalEnterPasswordProps) {
    const [password, setPassword] = React.useState('')

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        
    >
        <Title
            title={'Enter password'}
            subtitle={description ? description : 'Please enter your password to continue'}
        />
        <CardAlert
            title={'Authentication required'}
            message={'We need to verify that you have permission to perform this operation, this action is irreversible. Please make sure you want to continue.'}
            color='red'
        />
        <br />
        <InputHidden
            value={password}
            placeholder='Enter your current password'
            onChange={(e) => {
                setPassword(e)
            }}
            label='Password'
        />

        <ButtonLoading
            text='Confirm'
            onClick={() => {
                onConfirm(password)
            }}
            color='white'
            backgroundColor='yellowgreen'
        />

    </Modal>
  )
}

export default ModalEnterPassword