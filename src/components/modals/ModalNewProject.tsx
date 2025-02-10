import React, { useContext, useEffect } from 'react'
import styles from './modal.module.css'
import Modal from '../_globals/modal'
import Title from '../titles/Title'
import CardAlert from '../cards/CardAlert'
import InputCode from '../inputs/inputCode'
import Input from '../inputs/input'
import ButtonLoading from '../buttons/ButtonLoading'
import InputSelect from '../inputs/inputSelect'

import { createProjectAdmin, createProjectCustomer, getAllOperators, getAllUsers } from '@/services/api'
import { AuthContext } from '../_context/AuthContext'
import { TrashIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface ModalNewUserProps {
    isOpen: boolean,
    onClose: () => void,

}

function ModalNewProject({ isOpen, onClose }: ModalNewUserProps) {
    const {role} = useContext(AuthContext)

    const [formData, setFormData] = React.useState<any>({
        name: '',
        description: '',
    })

    const [operators, setOperators] = React.useState<any>([])
    const [operatorsSelected, setOperatorsSelected] = React.useState<any>([])

    const [customers, setCustomers] = React.useState<any>([])
    const [customerSelected, setCustomersSelected] = React.useState<any>(null)

    const handleCreateProjectAdmin = async () => {
        if (role !== 'admin') return toast.error('You are not allowed to create a project')
       
        const call = await createProjectAdmin(
            formData.name,
            formData.description,
            operatorsSelected.map((operator: any) => operator._id),
            customerSelected
        )

        if (call.success){
            toast.success('Project created')
            onClose()
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {
            toast.error('Error creating project')
        }
    }
    const handleCreateProjectCustomer = async () => {
        const call = await createProjectCustomer(
            formData.name,
            formData.description,
            operatorsSelected.map((operator: any) => operator._id),
        )

        if (call.success){
            toast.success('Project created')
            onClose()
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {
            toast.error('Error creating project')
        }
    }


    const handleFetchCustomers = async () => {
        
        const call = await getAllUsers()

        if (call.success){
            setCustomers(call.data)
        } else {
            toast.error('Error fetching customers')
        }
    }
    const handleFetchDevelopers = async () => {
        const call = await getAllOperators()
        if (call.success){
            setOperators(call.data)
        }
    }

    useEffect(() => {
        handleFetchDevelopers()
        handleFetchCustomers()
        
    }, [])

    


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
                        title={'Project information'}
                        subtitle={'Fill in the fields below to create a new project'}
                    />
                    <CardAlert
                        title={'Project Creation'}
                        message={'Fill in the fields below to create a new project, you will be able to set up later, tasks, team members and more.'}
                        
                        color='yellowgreen'
                    />

                    <div className='w-[100%] flex flex-col gap-2 mb-4 mt-4'>
                        {
                            role === 'admin' &&
                            <InputSelect
                                label='Customer'
                                placeholder={'Select a customer'}
                                options={customers.map((customer: any) => {
                                    return {
                                        label: customer.user.name,
                                        value: customer._id,
                                        picture: customer.user.profile_picture
                                    }
                                })}
                                value={customerSelected}
                                onSelect={(value) => {
                                    setCustomersSelected(value)
                                }}
                                style={{
                                    paddingLeft:'10px'
                                }}
                                radiusImage='50%'
                            />
                        }
                        <Input
                            label={'Project Name'}
                            placeholder='foo@codelabs.com'
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    name: e
                                })
                            }}
                        />
                        <Input
                            label={'Description'}
                            placeholder='John'
                            value={formData.description}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    description: e
                                })
                            }}
                        />
                    </div>


                    {
                        role === 'admin' &&
                        <>
                            <Title
                                title={'Team members'}
                                subtitle={'Select the team members who will be working on the project'}
                            />
                            <CardAlert
                                title={'Coming soon'}
                                message={'AI suggestions for team members based on the project.'}
                                color='yellowgreen'
                            />
                            <div className='w-[100%] flex flex-col gap-2 mb-10 mt-4'>
                                <InputSelect
                                    placeholder={'Select as many operators'}
                                    options={operators.map((operator: any) => {
                                        return {
                                            label: operator.user.name,
                                            value: operator._id,
                                            picture: operator.user.profile_picture
                                        }
                                    })}
                                    value={''}
                                    onSelect={(value) => {
                                        
                                        if (operatorsSelected.find((operator: any) => operator._id === value)){
                                            return toast.error('Operator already added')
                                        }

                                        const operatorObject = operators.find((operator: any) => operator._id === value)
                                        setOperatorsSelected([...operatorsSelected, operatorObject])
                                    }}
                                    style={{
                                        
                                        paddingLeft:'10px'
                                    }}
                                    radiusImage='50%'
                                />
                                {
                                    operatorsSelected.map((operator: any, index: number) => {
                                        return (
                                            <div key={index} className='flex items-center justify-between gap-2' style={{borderBottom: '1px solid #ffffff60', padding: '10px 0'}}>
                                                <span>{operator.user.name} {operator.user.surname}</span>
                                                <span className='cursor-pointer text-red-500' onClick={() => {
                                                    const newOperators = operatorsSelected.filter((item: any) => item.value !== operator.value)
                                                    setOperatorsSelected(newOperators)
                                                }}>
                                                    <TrashIcon width={18} color='var(--red)'/>
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                                <br />
                                <br />
                            </div>
                        </>
                    }
                    <ButtonLoading
                        text={'Create'}
                        onClick={()=>{
                            if(role === 'admin') return handleCreateProjectAdmin()
                            if(role === 'user') return handleCreateProjectCustomer()
                        }}
                        color='white'
                        backgroundColor='var(--green)'
                    />

                </Modal>
            }
        </div>
    )
}

export default ModalNewProject