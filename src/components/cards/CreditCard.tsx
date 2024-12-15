import React from 'react'
import styles from './card.module.css'
import { Wifi } from 'lucide-react'

interface CreditCardProps {
    type?: string

    name?: string
    number?: string
    expiry?: string

}

function CreditCard({type, name, number, expiry}: CreditCardProps) {
  return (
    <div className={styles.creditCard}>

        <div className='flex flex-row justify-between'>
            <p style={{fontSize: '25px', fontWeight: '200'}}>code labs</p>   
            <Wifi style={{
                transform: 'rotate(90deg)',
            }}/>
        </div>

        <img src="/icons/chip.png" className={styles.chip} alt="" />

        <div className='w-full flex flex-row items-end justify-between'>
            <div>
                <p style={{fontSize: '19px', fontWeight: '300', letterSpacing: '1.5px'}}>
                    {
                        number ? number : '0000 0000 0000 0000'
                    }
                </p>
                <p style={{fontSize: '15px'}}>
                    {
                        expiry ? expiry : '12/24'
                    }
                </p>
                <p style={{ fontSize: '14px', fontWeight: '300'}}>
                    {
                        name ? name : 'John Doe'
                    }
                </p>
            </div>

            {
                type &&
                type === 'mastercard' 
                ?
                <img src="/icons/mastercard.svg" className={styles.paymentProvider} alt="logo mastercard" />
                :
                type &&
                type === 'visa' &&
                <img src="/icons/visa.png" className={styles.paymentProvider} alt="logo mastercard" />
            }
        </div>

    </div>
  )
}

export default CreditCard