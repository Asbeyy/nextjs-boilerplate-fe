'use client'

import Image from "next/image";
import styles from "../login/page.module.css";
import Input from "@/components/inputs/input";
import { useEffect, useState } from "react";
import InputHidden from "@/components/inputs/inputHidden";
import ButtonLoading from "@/components/buttons/ButtonLoading";
import Card from "@/components/cards/Card";
import Tag from "@/components/tags/Tag";
import TitleXL from "@/components/titles/TitleXL";

import ToastCustom from "@/components/toast/Toast";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { register } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter()

  //States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')


  //Handlers
  const handleRegister = async () => {
    if (email === '' || password === '' || repeatPassword === '') {
      ToastCustom('error', 'Fill in all fields to proceed to register')
      return false
    }

    if (password !== repeatPassword) {
      ToastCustom('error', 'Passwords do not match')
      return false
    }

    const call = await register('', '', email, password)
    console.log(call)
    if (call.success) {
      ToastCustom('success', 'Account created successfully')
      setTimeout(() => {
        router.push('/auth/verify?email=' + email)
      }, 1000)
    } else {
      ToastCustom('error', call.message)
    }


    return true

  }



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

        <div className={styles.flying}>
          <Link href='/auth/login'>
            <Tag text="Login" style={{ color: 'white', fontWeight: '400', cursor: 'pointer' }} />
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
          text="CREATE ACCOUNT"
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
          Empowering with software solutions
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
          <InputHidden
            label={'Repeat password'}
            placeholder="********"
            onChange={setRepeatPassword}
            value={repeatPassword}
          />

          {
            password.length >= 8 &&
            repeatPassword.length >= 8 &&
            email !== '' &&
            password !== '' &&
            <ButtonLoading
              text={
                <div className="flex flex-row gap-2 items-center">
                  <span className="font-semibold">Register</span>
                  <ArrowRight width={20} />
                </div>
              }
              color="var(--text)"
              backgroundColor="var(--steam-color)"
              onClick={handleRegister}
            />
          }
        </div>

      </Card>
    </main >
  );
}





