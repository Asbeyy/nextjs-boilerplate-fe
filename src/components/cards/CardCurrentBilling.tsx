import React, { useEffect } from 'react'
import styles from './card.module.css'
import Card from './Card'
import Title from '../titles/Title'
import { Mail } from 'lucide-react'
import { getCurrentPaymentMethod } from '@/services/api'
import { StripeCardData } from '@/models/StripeCardData'
import CardAlert from './CardAlert'
import NoCreditCards from '../404/NoCreditCards'
import ModalEditPaymentMethod from '../modals/ModalEditPaymentMethod'
import ModalAllPaymentMethods from '../modals/ModalAllPaymentMethods'
import Skeleton from '../loaders/Skeleton'

interface Props {
  onNewPaymentMethod: () => void
}



function CardCurrentBilling({ onNewPaymentMethod }: Props) {
  const [editCurrentCard, setEditCurrentCard] = React.useState(false)
  const [currentCardData, setCurrentCardData] = React.useState<StripeCardData | null>(null)
  const [loading, setLoading] = React.useState(true)

  const [allPaymentMethods, setAllPaymentMethods] = React.useState([])
  const [modalPaymentMethods, setModalPaymentMethods] = React.useState(false)

  const toggleCurrentCardModal = () => {
    setEditCurrentCard(!editCurrentCard)
  }
  const toggleAllPaymentMethodsModal = () => {
    setModalPaymentMethods(!modalPaymentMethods)
  }
  const handleFetchCurrentBilling = async () => {
    // get current billing
    const call = await getCurrentPaymentMethod()
    console.log(call.data)
    if (call.success) {
      setCurrentCardData(call.data)
    } else {
      setCurrentCardData(null)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleFetchCurrentBilling()
  }, [])

  if (loading) {
    /* Skeleton for loading */
    return (
      <Card style={{ width: '100%', padding: '20px' }}>
        <div className='w-full h-[174px] flex items-center justify-center'>
          <Skeleton/>
        </div>
      </Card>
    )
  }


  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <div className='flex flex-row w-full'>
        <Title
          title={'Current payment method '}
          subtitle={'This will be used for your next payment'}
        />
        <div className='flex flex-col h-full'>
          <p onClick={toggleAllPaymentMethodsModal} className='w-[50px]' style={{borderBottom: '1px solid #ffffff60', cursor: 'pointer', fontSize: '13px', textAlign: 'center'}}>
            {/* {currentCardData && currentCardData.card.country} */}
            View all
          </p>
          {
            currentCardData &&
            modalPaymentMethods &&
            <ModalAllPaymentMethods
              isOpen={modalPaymentMethods}
              onClose={toggleAllPaymentMethodsModal}
              currentPaymentMethodId={currentCardData.id}
              quantityPaymentMethods={currentCardData.quantityPayementMethods}
            />
          }
        </div>
      </div>
      {
        currentCardData &&
        currentCardData.billing_details.email === null &&
        <CardAlert
          title={'Billing Details'}
          message={'Please make sure your billing email is set'}
          color='orange'
          style={{
            marginBottom: '20px'
          }}
        />
      }
      {
        currentCardData ?
          <div className='w-full flex flex-row gap-4' style={{ background: "var(--status-background)", padding: "15px", borderRadius: "10px" }}>
            {/* Logo Payment Provider */}
            <div>

              <div className={`flex ${currentCardData?.card.brand === 'visa' ? 'bg-[#121212]' : 'bg-[#ffffff]'} w-[70px] h-[40px] rounded-[10px] items-center justify-center`}>
                {
                  currentCardData?.card.brand === 'visa' ?
                  <img src="/icons/visa.png" style={{ scale: 0.5 }} alt="" /> :
                  currentCardData?.card.brand === 'mastercard' &&
                  <img src="/icons/mastercard.svg" style={{ scale: 0.6 }} alt="" />
                }
              </div>

            </div>

            {/* Info Billing */}
            <div className='w-[100%] flex flex-col'>
              <p style={{ fontSize: '13px', fontWeight: '500' }}>Card ending in {currentCardData?.card.last4}</p>
              <p style={{ fontSize: '14px', fontWeight: '300', color: "#ffffff80" }}>Expiry {currentCardData?.card.exp_month}/{currentCardData?.card.exp_year}</p>

              <div className='flex flex-row gap-2 items-center mt-2'>
                <Mail width={18} style={{ color: "#ffffff80" }} />
                <p style={{ fontSize: '13px', fontWeight: '300', color: "#ffffff80" }}>{currentCardData?.billing_details.email === null ? 'Please add a billing address' : currentCardData?.billing_details.email}</p>
              </div>

            </div>

            <div className='w-[50px] h-full flex justify-start'>
              <p onClick={toggleCurrentCardModal} style={{ fontSize: '14px', textAlign: 'end', width: '100%', cursor: 'pointer' }}>Edit</p>
              {
                currentCardData &&
                editCurrentCard &&
                <ModalEditPaymentMethod
                  isOpen={editCurrentCard}
                  onClose={toggleCurrentCardModal}
                  paymentMethodId={currentCardData?.id}
                  email={currentCardData?.billing_details.email}
                  name={currentCardData?.billing_details.name}
                />
              }
            </div>
          </div> :
          <NoCreditCards
            onNewPaymentMethod={onNewPaymentMethod}
          />
      }

    </Card>
  )
}

export default CardCurrentBilling