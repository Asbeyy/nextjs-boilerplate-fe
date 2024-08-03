'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Input from "@/components/inputs/input";
import { useEffect, useState } from "react";
import InputHidden from "@/components/inputs/inputHidden";
import Button from "@/components/buttons/Button";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import { authenticate, getToken, login, setToken } from "@/services/api";
import ErrorMessage from "@/components/toast/errorMessage";

export default function Home() {

  //States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [globalError, setGlobalError] = useState('')


  //Handlers
  const handleLogin = async () => {
    if (email === '' || password === '') {
      return false
    }

    const call = await login(email, password)

    if (call.success) {
      setToken(call.data)
      location.href = '/dashboard'
      return true
    }
    else {
      setGlobalError(call.message)
      return false
    }
  }
  const checkIfUserHasSession = async () => {
    //check if user has session (saved token)
    const token = getToken()
    if (token) {
      //token is saved, check its validity
      const call = await authenticate()

      if (call.success){
        //send user to dashboard
        location.href = '/dashboard'
      } else {
        //token is invalid, remove it
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

      <div className={styles.center}>
        <div className={styles.form}>
          <img className={styles.logoImg} src={process.env.NEXT_PUBLIC_PLATFORM_LOGO} />
          
          <div style={{ width: '100%', gap: '5px', display: 'flex', flexDirection: 'column' }}>
            <Input
              label={'Email'}
              onChange={setEmail}
              value={email}
              rules={[
                { type: 'email' },
              ]}
            />
            <InputHidden
              label={'Password'}
              onChange={setPassword}
              value={password}
              rules={[
                { type: 'minLength', value: 8 },
                { type: 'regex', value: new RegExp('\\d'), message: 'password must contain numbers' },
                { type: 'regex', value: new RegExp('[A-Z]'), message: 'password must contain one uppercase' },
                { type: 'regex', value: new RegExp('[!@#$%^&*(),.?":{}|<>]'), message: 'password must contain one special character' }
              ]}
            />
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: "center", flexDirection: 'column', gap: '5px' }}>
            <ButtonLoading
              text="Login"
              color="#000000"
              backgroundColor="#ffffff"
              onClick={handleLogin}
            />

            <p className={styles.bottomp}>Non hai un account? <a href="/register">Crea ora</a></p>
          </div>
        </div>
      </div>

      {
        globalError.length > 1 &&
        <ErrorMessage
          message={globalError}
        />
      }
    </main>
  );
}
