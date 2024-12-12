'use client'

import Image from "next/image";
import styles from "../login/page.module.css";
import { useEffect, useState } from "react";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import Card from "@/components/cards/Card";
import Tag from "@/components/tags/Tag";
import TitleXL from "@/components/titles/TitleXL";

import ToastCustom from "@/components/toast/Toast";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import InputCode from "@/components/inputs/inputCode";
import LoaderWhite from "@/components/loaders/LoaderWhite";
import { sendVerificationEmail, verifyEmail } from "@/services/api";


export default function Verify() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const [isVerifiable, setIsVerifiable] = useState(false) //this checks if the user actuallu needs to verify the email (if not send back to login)
  const [isVerifing, setIsVerifing] = useState(false) //this checks if the user is currently verifying the email (loading the verification call)

  const [code, setCode] = useState('')
  const [crono, setCrono] = useState(0)
  const maxTime = 120

  const handleSendEmail = async () => {
    if (isVerifing) return
    if (!email) return

    setIsVerifing(true)

    const call = await sendVerificationEmail(email)
    if (call.success) {
      setIsVerifiable(true)
      ToastCustom('success', 'Email sent successfully, check your emails and enter the code')
    } else {
      ToastCustom('error', call.message)
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    }

    



    setIsVerifing(false)
  }
  const handleVerifyEmail = async () => {
    if (isVerifing) return
    if (!email) return
    setIsVerifing(true)

    const call = await verifyEmail(email, code)
    if (call.success) {
      ToastCustom('success', 'Email verified successfully')
      setTimeout(() => {
        router.push('/auth/login?email=' + email)
      }, 3000)
    } else {
      ToastCustom('error', call.message)
    }

    setIsVerifing(false)
  }




  //Start counting seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (crono >= maxTime) {
        clearInterval(interval)
        ToastCustom('Any problem?', 'If you havent received the email, and checked your spam, click on the button below to send it again')
        return
      }
      setCrono(crono + 1)
    }, 1000);
    return () => clearInterval(interval);
  }, [crono]);

  useEffect(() => {
    if (code.length === 6) {
      handleVerifyEmail()
    }
  }, [code])

  useEffect(() => {
    if (!email) {
      //If there is no email, redirect to login
      router.push('/auth/login')
    } else {
      handleSendEmail()
    }
    
  },[])
  



  return (
    <main className={styles.main}>
      <Card className={styles.form}>

        <div className={styles.circleContainerLeft}>
          {
            Array.from({ length: 50 }).map((_, i) => (
              <div className={styles.circle} />
            ))
          }
        </div>
        <div className={styles.circleContainerRight}>
          {
            Array.from({ length: 50 }).map((_, i) => (
              <div className={styles.circle} />
            ))
          }
        </div>

        <Image
          className={styles.img}
          src="/images/caffeine_code_black.gif"
          alt=""
          width={100}
          height={120}
          style={{
            marginBottom: '1rem'
          }}
        />
        <Tag
          text="VALIDATE EMAIL"
          style={{
            marginBottom: '.5rem'
          }}
        />
        <TitleXL
          text="Code Labs Inc."
        />

        
        <div
          style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            margin: '2rem auto',
            textAlign: 'center'
          }}
        >
          {
            isVerifiable || 
            isVerifing
            ?
            <>
              Verify with the code sent to 
              <br />
              <span style={{borderBottom: '.5px solid #ffffff50'}}>{email}</span>
            </>
            :
            <LoaderWhite/>
          }
        </div>

        <div className={styles.containerInputs}>
            <InputCode
              value={code}
              onChange={(value: string)=>{
                setCode(value.toString())
              }}
              onCompletion={()=>{
                
              }}
              autoFocus={true}
            />
            <ButtonLoading
              deactive={crono < maxTime}
              text={
                <div className="flex flex-row gap-2 items-center">
                  <Mail width={20} />
                  <span className="font-semibold">Send again</span>
                </div>
              }
              color="var(--text)"
              backgroundColor="var(--steam-color)"
              onClick={() => {
                handleSendEmail()
              }}
            />
            <p
              style={{
                fontSize: '.825rem',
                color: 'var(--text-secondary)',
                maxWidth: '540px',
                margin: '0.5rem auto',
                textAlign: 'center',
                
                
              }}
            >
              {
                crono < maxTime &&
                `You can request a new code in ${maxTime - crono} seconds`
              }
            </p>
          
        </div>

      </Card>
    </main >
  );
}





