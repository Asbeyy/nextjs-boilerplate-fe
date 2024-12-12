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


function InputCode(
    props: {
        label?: string,
        value: string,
        onChange: (e:any) => void,
        onCompletion?: () => void,
        autoFocus?: boolean
    }
) {
    

  return (
    <div className={style.componentCode}>
        <p>
            {
                props.label &&
                props.label
            }
        </p>
        <div className={style.inputCode}>
            <input
                value={props.value}
                onChange={(e)=>{
                    if (isNaN(Number(e.target.value))) {
                        return
                    }
                    console.log(e.target.value.length)
                    if (e.target.value.length > 6) {
                        return
                    }

                    if (e.target.value.length == 6) {
                        if (props.onCompletion) {
                            props.onCompletion()
                        }
                    }

                    props.onChange(String(e.target.value))
                }}
                maxLength={6}
                type='string'
                autoFocus={props.autoFocus}
            />

            <div className='flex flex-row gap-2'>
                {
                    Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className={style.codeInput}
                            style={{
                                border: props.value.length != i ? '1px solid var(--steam-color)' : '1px solid var(--text-secondary)'
                            }}
                        >
                            {
                                props.value.length > i &&
                                props.value[i]
                            }
                        </div>
                    ))
                }
            </div>

            
        </div>
    </div>
  )
}

export default InputCode