import Title from '@/components/titles/Title'
import React, { useEffect } from 'react'
import styles from './settings.module.css'


import CardCurrentBilling from '@/components/cards/CardCurrentBilling'
import BillingTables from './BillingTables'
import { CreditCardIcon } from 'lucide-react'
import ModalAddCreditCard from '@/components/modals/ModalAddCreditCard'

function BillingPage() {
    const [modalNewCard, setModalNewCard] = React.useState(false)

    const handleToggleModalNewCard = () => {
        setModalNewCard(!modalNewCard)
    }

    return (
        <div className={styles.billingPage}>

            <div className={styles.form}>
                <Title
                    isLoading={false}
                    title={'Billing'}
                    subtitle={'Manage your billing information'}
                    actionRight={
                        <div className='px-5 py-2 bg-[var(--background)] rounded-lg cursor-pointer'>
                            <div
                                onClick={handleToggleModalNewCard}
                                className={styles.button} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <CreditCardIcon width={16} />
                                <p>Add payment method</p>
                            </div>
                            {
                                modalNewCard &&
                                <ModalAddCreditCard
                                    isOpen={modalNewCard}
                                    onClose={handleToggleModalNewCard}
                                />
                            }
                        </div>
                    }
                />

                <CardCurrentBilling 
                    onNewPaymentMethod={handleToggleModalNewCard}
                />
                <BillingTables />
            </div>
        </div>
    )
}

export default BillingPage