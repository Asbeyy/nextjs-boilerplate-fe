'use client'

import React, { useEffect, useState } from 'react'
import style from './input.module.css'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid'


 /**
  * 
  * @param props
  * @label the name of the input field
  * @value the value of the input field
  * @onChange the event triggered when inputing in the element
  * @type text || number
  * @required true || false
  * @rules {type: minLength || maxLength || email || regex, value: number || regex}
  * @returns 
  */


function InputHidden(
    props: {
        label: string,
        value: string,
        onChange: (e:any) => void,

        required?: boolean
        placeholder?: string
        style?: React.CSSProperties,
        rules?: { type: string, value?: any, message?: string}[] //set the array of string errors
    }
) {
    const [error, setError] = useState('')
    const [visible, setVisible] = useState(false)
    
    const errorCheck = () => {
    if (props.rules) {
        for (const rule of props.rules) {

        if (props.required && !props.value) {
            setError(`${props.label} is required`);
            return;
        }

        if (rule.type === 'minLength' && props.value.length >= 1 && props.value.length < rule.value) {
            setError(`${props.label} must be at least ${rule.value} characters long`);
            return;
        }

        if (rule.type === 'maxLength' && props.value.length >= rule.value) {
            setError(`${props.label} must be no more than ${rule.value} characters long`);
            return;
        }

        if (props.value.length >= 1 && rule.type === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(props.value)) {
            setError('Email format is invalid');
            return;
        }

        if (rule.type === 'regex' && props.value.length >= 1 && !rule.value.test(props.value)) {
            setError(String(rule.message));
            return;
        }  
        }
    }
    setError(''); // Clear error if no rules are violated
    };
    const toggleVisible = () => {
        setVisible(prev => !prev)
    }

    useEffect(()=>{
        if (props.rules){
            errorCheck()
        }
    },[props.value])

  return (
    <div className={style.component}>
        <p>
            {props.label}
            {
                props.required &&
                <label>*</label>
            }
        </p>
        <div className={style.inputContainer}>
            <input 
                type={visible ? 'text' : 'password'}
                style={{
                    color: error.length > 1 ? 'tomato' : 'white'
                }} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e)=>{
                    props.onChange(e.target.value)
                }}
            />
            {
                !visible ?
                <EyeIcon
                    className={style.icon}
                    onClick={toggleVisible}
                /> :
                <EyeSlashIcon
                    className={style.icon}
                    onClick={toggleVisible}
                />
            }
        </div>
        <p className={style.error}>
        
            {
                error.length > 0 &&
                error
            }
        </p>
    </div>
  )
}

export default InputHidden