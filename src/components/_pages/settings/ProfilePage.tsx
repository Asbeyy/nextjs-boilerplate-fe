import Title from '@/components/titles/Title'
import React, { useContext, useEffect } from 'react'
import styles from './settings.module.css'
import SkeletonRound from '@/components/loaders/SkeletonRound'
import { getSettingsProfile, updateSettingsProfileName, updateSettingsProfilePicture } from '@/services/api'
import toast from 'react-hot-toast'
import LoaderWhite from '@/components/loaders/LoaderWhite'
import Input from '@/components/inputs/input'
import ButtonLoading from '@/components/buttons/ButtonLoading'
import { Camera } from 'lucide-react'
import CardAlert from '@/components/cards/CardAlert'
import InputCalendar from '@/components/inputs/InputCalendar'
import InputPhone from '@/components/inputs/inputPhone'
import { formatDateString } from '@/utils/formatDate'
import Tag from '@/components/tags/Tag'
import { AuthContext } from '@/components/_context/AuthContext'

function ProfilePage() {
    const { role } = useContext(AuthContext)

    const [isUploadingPicture, setIsUploadingPicture] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    const [profile, setProfile] = React.useState<any>(null)

    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [birthdate, setBirthdate] = React.useState('')

    const [phone, setPhone] = React.useState('')
    const [countryCode, setCountryCode] = React.useState('+1')
    const [address, setAddress] = React.useState('')

    const [didChange, setDidChange] = React.useState(false)


    const handleFetchProfile = async () => {
        setIsLoading(true)
        const call = await getSettingsProfile()
        console.log(call)
        if (call.success) {
            setProfile(call.data.user)
            setName(call.data.user.name)
            setSurname(call.data.user.surname)
            setAddress(call.data.contacts.address)



            setBirthdate(formatDateString(call.data.user.birthdate))



            setCountryCode(call.data.contacts.phone.split('-')[0])
            if (call.data.contacts.phone !== '') {
                setPhone(call.data.contacts.phone.split('-')[1])
            }
        } else {
            toast.error(call.message)
        }

        setIsLoading(false)

    }
    const handleProfilePictureUpload = async (e: any) => {
        if (isUploadingPicture) return
        setIsUploadingPicture(true)
        const call = await updateSettingsProfilePicture(e.target.files[0])

        if (call.success) {
            toast.success(call.message)
            handleFetchProfile()
        } else {
            toast.error(call.message)
        }

        setIsUploadingPicture(false)
    }
    const handleProfileNameUpdate = async () => {
        if (!didChange) return toast.error('No changes detected')

        const call = await
            updateSettingsProfileName(
                name,
                surname,
                birthdate,
                address,
                `${countryCode}-${phone}`
            )

        if (call.success) {
            toast.success(call.message)
            setDidChange(false)
        } else {
            toast.error(call.message)
        }

        return true
    }



    useEffect(() => {
        handleFetchProfile()
    }, [])


    return (
        <div className={styles.profilePage}>

            <div className={styles.form}>
                <Title
                    isLoading={isLoading}
                    title={'Profile Settings'}
                    subtitle={`${name} ${surname}`}
                />

                {/* Profile Picture */}
                <div className='w-full mb-16' style={{ position: 'relative' }}>
                    <img src="/banners/banner.jpg" className={styles.banner} alt="" />
                    <div style={{ top: '80px', left: 50, position: 'absolute' }}>
                        {
                            profile &&
                                profile.profile_picture
                                ?
                                <div>
                                    <div
                                        title='Change Profile Picture'
                                        style={{
                                            transform: 'translate(50%, 50px)',
                                            borderRadius: '50%',
                                            background: 'var(--status-color',
                                            backdropFilter: 'blur(10px)',

                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            width: '60px',
                                            height: '60px',
                                        }}

                                    >
                                        <label htmlFor="name">
                                            {
                                                !isUploadingPicture &&
                                                <Camera width={22} />
                                            }

                                            {
                                                isUploadingPicture &&
                                                <LoaderWhite />
                                            }
                                        </label>
                                    </div>

                                    <input hidden type="file" id="name" onChange={(e) => {
                                        if (e.target.files) {
                                            handleProfilePictureUpload(e)
                                        }
                                    }} />

                                    <img
                                        src={profile.profile_picture}
                                        alt=""
                                        className={styles.avatar}
                                    />
                                </div>
                                :
                                profile &&
                                    !profile.profile_picture ?
                                    <div>
                                        <div
                                            title='Change Profile Picture'
                                            style={{
                                                transform: 'translate(50%, 50px)',
                                                borderRadius: '50%',
                                                background: 'var(--status-color',
                                                backdropFilter: 'blur(10px)',

                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                width: '60px',
                                                height: '60px',
                                            }}

                                        >
                                            <label htmlFor="name">
                                                {
                                                    !isUploadingPicture &&
                                                    <Camera width={22} />
                                                }

                                                {
                                                    isUploadingPicture &&
                                                    <LoaderWhite />
                                                }
                                            </label>
                                        </div>

                                        <input hidden type="file" id="name" onChange={(e) => {
                                            if (e.target.files) {
                                                handleProfilePictureUpload(e)
                                            }
                                        }} />

                                        <div className={styles.avatar}>
                                            <span style={{ fontSize: '60px' }}>
                                                {profile.name[0].toUpperCase()}
                                                {profile.surname[0].toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    :
                                    <div className={styles.avatar} style={{
                                        position: 'absolute',
                                        top: '60px',
                                    }}>
                                        <SkeletonRound />
                                    </div>
                        }


                    </div>
                    <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
                        <Tag
                            text={role ? role : 'User'}

                        />
                    </div>
                </div>

                {/* Personal Information */}
                <div className='flex flex-col mt-14' style={{ width: '100%' }}>
                    <Title
                        isLoading={false}
                        title={'Personal Information'}
                        subtitle={'Manage your personal information'}
                        actionRight={
                            <div style={{ width: '400px' }}>
                                <ButtonLoading
                                    text={'Save'}
                                    color='white'
                                    backgroundColor={`${didChange ? 'yellowgreen' : 'gray'}`}
                                    deactive={!didChange}
                                    onClick={handleProfileNameUpdate}
                                />
                            </div>
                        }
                    />
                    <CardAlert
                        title={'Note'}
                        message={'The data you provide here will be used to identify you in the platform, and will not be shared with anyone. Please make sure to provide accurate information, for billing and security purposes.'}
                        color='yellowgreen'
                        style={{ marginBottom: '20px' }}
                    />
                    <Title
                        isLoading={false}
                        subtitle={'Identity information'}
                    />
                    <div className="flex flex-col mb-14">
                        <div className='w-full'>
                            <Input
                                label={'Name'}
                                value={name}
                                onChange={(e) => {
                                    setDidChange(true)
                                    setName(e)
                                }}
                            />
                        </div>
                        <div className='w-full'>
                            <Input
                                label={'Surname'}
                                value={surname}
                                onChange={(e) => {
                                    setDidChange(true)
                                    setSurname(e)
                                }}
                            />
                        </div>
                        <div className='w-full'>
                            <InputCalendar
                                label={'Birthdate'}
                                value={birthdate}
                                onChange={(e) => {
                                    setDidChange(true)
                                    setBirthdate(e)
                                }}
                            />
                        </div>
                    </div>


                    <Title
                        isLoading={false}
                        subtitle={'Contact information'}
                    />
                    <div className="flex flex-col">
                        <div className='w-full'>
                            <Input
                                label={'Address'}
                                value={address && address}
                                placeholder={'No address saved, insert one'}
                                onChange={(e) => {
                                    setDidChange(true)
                                    setAddress(e)
                                }}
                            />
                        </div>
                        <div className='w-full mb-4'>
                            <InputPhone
                                label={'Phone'}
                                value={phone}
                                valueCountry={countryCode}
                                placeholder='123 456 7890'
                                onChangeCountry={(e) => {
                                    setDidChange(true)
                                    setCountryCode(e)
                                }}
                                onChange={(e) => {
                                    setDidChange(true)
                                    setPhone(e)
                                }}
                            />
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default ProfilePage