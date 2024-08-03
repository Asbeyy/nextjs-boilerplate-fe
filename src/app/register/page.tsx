'use client'

import Image from "next/image";
import styles from "../page.module.css";
import Input from "@/components/inputs/input";
import { useState } from "react";
import InputHidden from "@/components/inputs/inputHidden";
import Button from "@/components/buttons/Button";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import { register } from "@/services/api";
import ErrorMessage from "@/components/toast/errorMessage";
import ConfirmMessage from "@/components/toast/confirmMessage";

export default function Home() {

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [repeatPasswordError, setRepeatPasswordError] = useState('')

  const [globalError, setGlobalError] = useState('')
  const [globalSuccess, setGlobalSuccess] = useState('')


  const handleRegister = async () => {
    if (name === '' || surname === '' || email === '') {
      setGlobalError('Compila tutti i campi')
      return false
    }
    if (password !== repeatPassword) return false 
    if (password === '' || repeatPassword === '') return false

    const call = await register(name, surname, email, password)

    if (call.success){
      setGlobalSuccess('Registrazione avvenuta con successo')
      setTimeout(() => {
        location.href = '/'
      },1000)

      return true

    } else {
      setGlobalError(call.message)
      return false
    }
  }

  const handleRepeatPassword = (value: string) => {
    setRepeatPassword(value)

    if (value !== password) {
      setRepeatPasswordError('Le password non corrispondono')
    } else {
      setRepeatPasswordError('')
    }
  }

  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <div className={styles.form}>
          <img className={styles.logoImg} src={process.env.NEXT_PUBLIC_PLATFORM_LOGO} />
          <div style={{ width: '100%', gap: '5px', display: 'flex', flexDirection: 'column' }}>
            <Input
              label={'Nome'}
              onChange={setName}
              value={name}
              rules={[]}
            />
            <Input
              label={'Cognome'}
              onChange={setSurname}
              value={surname}
              rules={[]}
            />
            <div className={styles.line} />
            <Input
              label={'Email'}
              onChange={setEmail}
              value={email}
              rules={[
                { type: 'email' }
              ]}
            />
            <div className={styles.line} />
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
            <InputHidden
              label={'Ripeti Password'}
              onChange={(value) => handleRepeatPassword(value)}
              value={repeatPassword}
              rules={[]}
            />
            {
              repeatPasswordError.length > 1 &&
              <p style={{ color: 'tomato', fontSize: '12px', transform: 'translateY(-20px)' }}>{repeatPasswordError}</p>
            }
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: "center", flexDirection: 'column', gap: '5px' }}>
            <ButtonLoading
              text="Registrati"
              color="#000000"
              backgroundColor="#ffffff"
              onClick={handleRegister}
            />

            <p className={styles.bottomp}>Hai gia un account? <a href="/">Accedi ora</a></p>
          </div>
        </div>
      </div>
          
      {
        globalError.length > 1 &&
        <ErrorMessage
          message={globalError}
        />
      }

      {
        globalSuccess.length > 1 &&
        <ConfirmMessage
          message={globalSuccess}
        />
      }

    </main>
  );
}
