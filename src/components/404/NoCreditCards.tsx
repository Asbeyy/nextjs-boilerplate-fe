import React from 'react'
import Button from '../buttons/Button'

import styles from './noresults.module.css'
import { useRouter } from 'next/navigation'
import { CreditCard } from 'lucide-react'
import CardAlert from '../cards/CardAlert'

interface Props {
    onNewPaymentMethod: () => void
}

function NoCreditCards({ onNewPaymentMethod }: Props) {
    const router = useRouter()
    const [isMouseOver, setIsMouseOver] = React.useState(false)

    const handleMouseOver = () => {
        console.log('Mouse over')
        setIsMouseOver(!isMouseOver)
    }


    return (
        <div className='w-full flex justify-center items-center flex-col'>
            <CardAlert
                title={'No payment method'}
                message={'To proceed with your next payment, please add a payment method'}
                color='red'
                style={{
                    marginTop: '20px'
                }}
            />

            <img src="/icons/magnifing_glass.png" width={200} height={200} alt="" />

            <div className='w-[300px] mb-2'>
                <Button
                    onHover={handleMouseOver}
                    text='Add payment method'
                    icon={
                        <CreditCard width={18}
                            className={styles.noResultsIcon}
                            style={{
                                transform: isMouseOver ? ' rotate(360deg)' : 'rotate(0deg)',

                            }}
                        />
                    }
                    color='white'
                    backgroundColor='var(--background)'
                    onClick={() => {
                        onNewPaymentMethod()
                    }}
                />
            </div>

        </div>
    )
}

export default NoCreditCards