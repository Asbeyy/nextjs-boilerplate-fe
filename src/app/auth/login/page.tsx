'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Input from "@/components/inputs/input";
import { Suspense, useEffect, useState } from "react";
import InputHidden from "@/components/inputs/inputHidden";
import Button from "@/components/buttons/Button";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import { authenticate, getToken, login, setToken } from "@/services/api";
import Card from "@/components/cards/Card";
import Tag from "@/components/tags/Tag";
import TitleXL from "@/components/titles/TitleXL";
import toast from "react-hot-toast";
import ToastCustom from "@/components/toast/Toast";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import LoaderWhite from "@/components/loaders/LoaderWhite";

export default function Main() {
  return (
    <Suspense fallback={<LoaderWhite/>}>
      <Home/>
    </Suspense>
  )
}

function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()

  
  //States
  const emailLogin = searchParams.get('email')
  const [email, setEmail] = useState(emailLogin && emailLogin !== '' ? emailLogin : '')
  const [password, setPassword] = useState('')


  //Handlers
  const handleLogin = async () => {
    if (email === '' || password === '') {
      ToastCustom('error', 'Email and password are required to login please fill them in to proceed or create an account')
      return false
    }

    const call = await login(email, password)
    
    if (call.success) {
      
      if (call.isFirstLogin) {
        router.push('/auth/verify?email=' + email)
        return true
      }
      
      setToken(call.data)
      router.push('/dashboard')
      return true
    }
    else {
      ToastCustom('error', call.message)
      return false
    }
  }
  const checkIfUserHasSession = async () => {
    //check if user has session (saved token)
    const token = getToken()
    if (token) {
      //token is saved, check its validity
      const call = await authenticate()

      if (call.success) {
        //send user to dashboard
        router.push('/dashboard')
      } else {
        //token is invalid, remove it
        router.push('/auth/login')
        localStorage.removeItem('token-storyx')

      }
    }
  }


  //Effects
  useEffect(() => {
    checkIfUserHasSession()
  }, [])


  return (
    <main className={styles.main}>
      <Card className={styles.form}>
        <div className={styles.circleContainerLeft}>
          {
            Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className={styles.circle}/>
            ))
          }
        </div>

        <div className={styles.circleContainerRight}>
          {
            Array.from({ length: 50 }).map((_, i) => (
              <div key={i} className={styles.circle}/>
            ))
          }
        </div>
        

        <div className={styles.flying}>
          <Link href='/auth/register'>
            <Tag text="Register" style={{ color: 'white', fontWeight: '400', cursor: 'pointer' }} />
          </Link>
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
          text="LOGIN NOW"
          style={{
            marginBottom: '.5rem'
          }}
        />
        <TitleXL
          text="Code Labs Inc."
        />

        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            margin: '2rem auto',
          }}
        >
          Empowering with software solutions.
        </p>

        <div className={styles.containerInputs}>
          <Input
            label={'Email'}
            placeholder="foo@codelabs.com"
            onChange={setEmail}
            value={email}
            rules={[
              { type: 'email' },
            ]}

          />
          <InputHidden
            label={'Password'}
            placeholder="********"
            onChange={setPassword}
            value={password}
            rules={[
              { type: 'minLength', value: 8 },
              { type: 'regex', value: new RegExp('\\d'), message: 'password must contain numbers' },
              { type: 'regex', value: new RegExp('[A-Z]'), message: 'password must contain one uppercase' },
              { type: 'regex', value: new RegExp('[!@#$%^&*(),.?":{}|<>]'), message: 'password must contain one special character' }
            ]}
          />
          <br />
          {
            password.length >= 8 &&
            email !== '' &&
            password !== '' &&
            <ButtonLoading
              text={
                <div className="flex flex-row gap-2 items-center">
                  <span className="font-semibold">Login</span>
                  <ArrowRight width={20} />
                </div>
              }
              color="var(--text)"
              backgroundColor="var(--steam-color)"
              onClick={handleLogin}
            />
          }
        </div>

      </Card>
    </main >
  );
}





