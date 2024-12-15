import React from 'react'
import styles from './modal.module.css'
import Modal from '../_globals/modal'
import Title from '../titles/Title'
import CardAlert from '../cards/CardAlert'
import InputCode from '../inputs/inputCode'
import Input from '../inputs/input'
import ButtonLoading from '../buttons/ButtonLoading'
import InputSelect from '../inputs/inputSelect'
import ToastCustom from '../toast/Toast'

interface ModalNewUserProps {
    isOpen: boolean,
    onClose: () => void,

}

function ModalNewUser({ isOpen, onClose }: ModalNewUserProps) {

    const [formData, setFormData] = React.useState({
        email: '',
        name: '',
        surname: '',
        role: ''
    })

    const handleCreateUser = async () => {

        if (!formData.email || !formData.name || !formData.surname || !formData.role) {
            ToastCustom('error', 'All fields are required')
            return true
        }

        ToastCustom('success', 'User created successfully')
        return true
    }



    return (
        <div>
            {
                isOpen &&
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    width={'50%'}
                >
                    <Title
                        title={'Basic information'}
                        subtitle={'Fill in the fields below to create a new user'}
                    />
                    <CardAlert
                        title={'User creation'}
                        message={'Below you can see the fields to create a new user. Fill in all the fields and click on the create button.'}
                        learnMoreLink='/'
                        color='yellowgreen'
                    />

                    <div className='w-[100%] flex flex-col gap-2 mb-4 mt-4'>
                        <Input
                            label={'Email'}
                            placeholder='foo@codelabs.com'
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email: e
                                })
                            }}
                        />
                        <Input
                            label={'Name'}
                            placeholder='John'
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e
                                })
                            }}
                        />
                        <Input
                            label={'Surname'}
                            placeholder='Doe'
                            value={formData.surname}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    surname: e
                                })
                            }}
                        />
                    </div>


                    <Title
                        title={'Permissions'}
                        subtitle={'Select the role of the new user'}
                    />
                    <CardAlert
                        title={'Attention'}
                        message={'The role of the user will determine the permissions he will have in the application. Choose the role carefully.'}
                        learnMoreLink='/'
                        color='tomato'
                    />
                    <div className='w-[100%] flex flex-col gap-2 mb-10 mt-4'>
                        <InputSelect
                            label={'Role'}
                            placeholder={'Select a role'}
                            options={[
                                { value: '1', label: 'Admin' },
                                { value: '2', label: 'Developer' },
                                { value: '3', label: 'User' },
                            ]}
                            value={formData.role}
                            onSelect={(value) => {
                                setFormData({
                                    ...formData,
                                    role: value
                                })
                            }}
                        />
                        <ButtonLoading
                            text={'Create'}
                            onClick={handleCreateUser}
                            color='white'
                            backgroundColor='var(--accent)'
                        />
                    </div>
                </Modal>
            }
        </div>
    )
}

export default ModalNewUser