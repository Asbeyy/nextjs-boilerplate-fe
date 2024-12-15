import Title from '@/components/titles/Title'
import React, { useEffect } from 'react'
import styles from './settings.module.css'


import Input from '@/components/inputs/input'
import ButtonLoading from '@/components/buttons/ButtonLoading'
import InputHidden from '@/components/inputs/inputHidden'

import toast from 'react-hot-toast'
import ModalEnterPassword from '@/components/modals/ModalEnterPassword'
import { getSettingsAccess, setToken, updateSettingsAccessEmail, updateSettingsAccessPassword } from '@/services/api'
import Card from '@/components/cards/Card'
import CardAlert from '@/components/cards/CardAlert'


function AccessPage() {
    const [email, setEmail] = React.useState('')
    const [originalEmail, setOriginalEmail] = React.useState('')

    const [password, setPassword] = React.useState('')
    const [repeatPassword, setRepeatPassword] = React.useState('')

    const [modalPassword, setModalPassword] = React.useState(false)
    const [modalEmail, setModalEmail] = React.useState(false)


    const handleFetchProfile = async () => {
        const call = await getSettingsAccess()
        console.log(call)
        if (call.success) {
            console.log(call.data)
            setEmail(call.data)
            setOriginalEmail(call.data)

        } else {
            toast.error(call.message)
        }

    }

    const handleToggleModalPassword = () => {
        setModalPassword(!modalPassword)
        return true
    }
    const handleToggleModalEmail = () => {
        setModalEmail(!modalEmail)
        return true
    }
    const handleUpdateEmail = async (currentPassword: string) => {
        const call = await updateSettingsAccessEmail(email, currentPassword)

        if (call.success) {
            toast.success(call.message)
            setToken(call.data)
            setOriginalEmail(email)
            handleToggleModalEmail()
        } else {
            toast.error(call.message)
        }

        return true
    }
    const handleUpdatePassword = async (currentPassword: string) => {
        if (password !== repeatPassword) {
            toast.error('Passwords do not match')
            return false
        }

        const call = await updateSettingsAccessPassword(currentPassword, password)
        if (call.success) {
            toast.success(call.message)
            setToken(call.data)
            setPassword('')
            setRepeatPassword('')
            handleToggleModalPassword()
        } else {
            toast.error(call.message)
        }

        return true
    }

    useEffect(() => {
        handleFetchProfile()
    }, [])

    return (
        <div className={styles.accessPage}>

            <div className={styles.form}>
                <Title
                    isLoading={false}
                    title={'Access'}
                    subtitle={'Manage your access information, email and password'}
                />
                <CardAlert
                    title={'Important'}
                    message={'Your email and password are used to access the platform. Keep them safe and do not share them with anyone.'}
                    color='yellowgreen'
                    style={{
                        marginBottom: '20px'
                    }}
                />

                <Card style={{ width: '100%' }}>
                    <div className='flex flex-col' style={{ width: '100%' }}>
                        <Input
                            label={'Email'}
                            value={email}
                            onChange={(e) => {
                                setEmail(e)
                            }}
                        />
                        <ButtonLoading
                            text={'Update email'}
                            color='white'
                            backgroundColor='yellowgreen'
                            deactive={email === originalEmail}
                            onClick={
                                handleToggleModalEmail
                            }
                        />

                        <br />
                        <CardAlert
                            title={'Change password'}
                            message={'To change your password, you must enter your current password and then enter the new password.'}
                            color='orange'
                            style={{
                                marginTop: '30px',
                                marginBottom: '10px'
                            }}
                        />
                        <InputHidden
                            label={'Password'}
                            value={password}
                            onChange={(e) => {
                                setPassword(e)
                            }}
                            rules={[
                                { type: 'minLength', value: 8 },
                                { type: 'regex', value: new RegExp('\\d'), message: 'password must contain numbers' },
                                { type: 'regex', value: new RegExp('[A-Z]'), message: 'password must contain one uppercase' },
                                { type: 'regex', value: new RegExp('[!@#$%^&*(),.?":{}|<>]'), message: 'password must contain one special character' }
                            ]}
                        />

                        <div
                            style={{
                                opacity: password.length >= 8 ? 1 : 0.4,
                                pointerEvents: password.length >= 8 ? 'all' : 'none',
                                cursor: password.length >= 8 ? 'pointer' : 'not-allowed'
                            }}
                        >
                            <InputHidden

                                label={'Repeat password'}
                                value={repeatPassword}
                                onChange={(e) => {
                                    setRepeatPassword(e)
                                }}
                            />
                        </div>
                        <ButtonLoading
                            text='Update password'
                            color="var(--text)"
                            backgroundColor="yellowgreen"
                            deactive={password.length < 8 || repeatPassword.length < 8}
                            onClick={handleToggleModalPassword}
                        />
                    </div>
                </Card>

                {
                    modalEmail &&
                    <ModalEnterPassword
                        isOpen={modalEmail}
                        onClose={handleToggleModalEmail}
                        onConfirm={(password) => {
                            handleUpdateEmail(password)
                        }}
                    />
                }
                {
                    modalPassword &&
                    <ModalEnterPassword
                        isOpen={modalPassword}
                        onClose={handleToggleModalPassword}
                        onConfirm={(password) => {
                            handleUpdatePassword(password)
                        }}
                    />
                }


            </div>
        </div>
    )
}

export default AccessPage