'use client'

import React, { useEffect, useState } from 'react'
import style from './input.module.css'


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


function InputCalendar(
    props: {
        label: string,
        value: string,
        onChange: (e: any) => void,

        type?: string
        required?: boolean
        placeholder?: string
        style?: React.CSSProperties,
        rules?: { type: string, value?: any, message?: string }[] //set the array of string errors
    }
) {
  
   

    return (
        <div className={style.component}>
            <p style={{ color: "white" }}>
                {props.label}
                {
                    props.required &&
                    <label>*</label>
                }
            </p>
            <div className={style.inputContainer}>
                <input
                    type='date'
                    style={{
                        color: 'white',
                        fontSize: '12px',

                    }}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => {
                        props.onChange(e.target.value)
                    }}
                />
            </div>
            
        </div>
    )
}

export default InputCalendar