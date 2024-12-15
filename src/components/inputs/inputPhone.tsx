'use client'

import React, { useEffect, useState } from 'react'
import style from './input.module.css'
import styles from './input.module.css'
import { ChevronDownIcon } from 'lucide-react'
import { count } from 'console'



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


function InputPhone(
    props: {
        label?: string,
        value: string,
        valueCountry?: string,
        onChange: (e: any) => void,
        onChangeCountry?: (e: any) => void,

        required?: boolean
        placeholder?: string
        style?: React.CSSProperties,
    }
) {

    const [country, setCountry] = useState('+1')

    const countryData = [
        { value: "+250", label: "+250 (Rwanda)", picture: "/flags/748098_rwanda_flag.png" },
        { value: "+229", label: "+229 (Benin)", picture: "/flags/748047_benin_flag.png" },
        { value: "+263", label: "+263 (Zimbabwe)", picture: "/flags/748142_flag_zimbabwe.png" },
        { value: "+260", label: "+260 (Zambia)", picture: "/flags/748088_flag_zambia.png" },
        { value: "+58", label: "+58 (Venezuela)", picture: "/flags/748087_flag_venezuela.png" },
        { value: "+386", label: "+386 (Slovenia)", picture: "/flags/748096_flag_slovenia.png" },
        { value: "+973", label: "+973 (Bahrain)", picture: "/flags/748019_flag_bahrain.png" },
        { value: "+48", label: "+48 (Poland)", picture: "/flags/748114_flag_poland.png" },
        { value: "+44", label: "+44 (Scotland)", picture: "/flags/748086_flag_scotland.png" },
        { value: "+967", label: "+967 (Yemen)", picture: "/flags/748138_yemen_flag.png" },
        { value: "+30", label: "+30 (Greece)", picture: "/flags/748104_flag_greece.png" },
        { value: "+359", label: "+359 (Bulgaria)", picture: "/flags/748038_bulgaria_flag.png" },
        { value: "+255", label: "+255 (Tanzania)", picture: "/flags/748053_flag_tanzania.png" },
        { value: "+49", label: "+49 (Germany)", picture: "/flags/748067_flag_germany.png" },
        { value: "+267", label: "+267 (Botswana)", picture: "/flags/748080_botswana_flag.png" },
        { value: "+220", label: "+220 (Gambia)", picture: "/flags/748090_gambia_flag.png" },
        { value: "+994", label: "+994 (Azerbaijan)", picture: "/flags/748073_azerbaijan_flag.png" },
        { value: "+231", label: "+231 (Liberia)", picture: "/flags/748136_liberia_flag.png" },
        { value: "+34", label: "+34 (Spain)", picture: "/flags/748120_flag_spain.png" },
        { value: "+53", label: "+53 (Cuba)", picture: "/flags/748032_flag_cuba.png" },
        { value: "+372", label: "+372 (Estonia)", picture: "/flags/748071_flag_estonia.png" },
        { value: "+961", label: "+961 (Lebanon)", picture: "/flags/748121_flag_lebanon.png" },
        { value: "+850", label: "+850 (North Korea)", picture: "/flags/748030_flag_north_korea.png" },
        { value: "+592", label: "+592 (Guyana)", picture: "/flags/748081_guyana_flag.png" },
        { value: "+591", label: "+591 (Bolivia)", picture: "/flags/748062_bolivia_flag.png" },
        { value: "+354", label: "+354 (Iceland)", picture: "/flags/748040_flag_iceland.png" },
        { value: "+855", label: "+855 (Cambodia)", picture: "/flags/748028_flag_cambodia.png" },
        { value: "+62", label: "+62 (Indonesia)", picture: "/flags/748135_flag_indonesia.png" },
        { value: "+90", label: "+90 (Turkey)", picture: "/flags/748103_flag_turkey.png" },
        { value: "+43", label: "+43 (Austria)", picture: "/flags/748005_austria_flag.png" },
        { value: "+86", label: "+86 (China)", picture: "/flags/748006_flag_china.png" },
        { value: "+1 242", label: "+1 242 (The Bahamas)", picture: "/flags/748093_thebahamas_flag.png" },
        { value: "+245", label: "+245 (Guinea-Bissau)", picture: "/flags/748027_bissau_flag_guinea.png" },
        { value: "+91", label: "+91 (India)", picture: "/flags/748132_india_flag.png" },
        { value: "+504", label: "+504 (Honduras)", picture: "/flags/748101_flag_honduras.png" },
        { value: "+964", label: "+964 (Iraq)", picture: "/flags/748099_flag_iraq.png" },
        { value: "+375", label: "+375 (Belarus)", picture: "/flags/748082_belarus_flag.png" },
        { value: "+65", label: "+65 (Singapore)", picture: "/flags/748125_singapore_flag.png" },
        { value: "+357", label: "+357 (Cyprus)", picture: "/flags/748031_cyrus_flag.png" },
        { value: "+224", label: "+224 (Guinea)", picture: "/flags/748129_guinea_flag.png" },
        { value: "+251", label: "+251 (Ethiopia)", picture: "/flags/748074_ethiopia_flag.png" },
        { value: "+972", label: "+972 (Israel)", picture: "/flags/748123_flag_israel.png" },
        { value: "+672", label: "+672 (Antarctica)", picture: "/flags/748033_antarctica_flag.png" },
        { value: "+1", label: "+1 (United States)", picture: "/flags/748050_flag_usa.png" },
        { value: "+41", label: "+41 (Switzerland)", picture: "/flags/748124_flag_switzerland.png" },
        { value: "+39", label: "+39 (Italy)", picture: "/flags/748049_flag_italy.png" },
        { value: "Other", label: "(# Other) - Not listed", picture: "/icons/chip.png" }
    ];


    useEffect(() => {
        if (props.valueCountry)
            setCountry(props.valueCountry)
    }, [props.valueCountry])

    


    return (
        <div className={style.component}>
            <p>
                {
                    props.label &&
                    props.label
                }
                {
                    props.label &&
                    props.required &&
                    <label>*</label>
                }
            </p>
            <div className={style.inputContainer}>
                <div className={style.countrySelect}>
                    
                    <InputSelect
                        value={country}
                        onSelect={(e) => {
                            if (props.onChangeCountry)
                                props.onChangeCountry(e)
                        }}
                        placeholder='+1'
                        options={countryData.sort((a: any, b: any) => {
                            return a.label.split('(')[1].split(')')[0].localeCompare(b.label.split('(')[1].split(')')[0])
                        })}
                    />
                </div>
                <input
                    type='number'
                    style={{
                        color: 'white',
                        paddingLeft: '10px',
                    }}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={(e) => {
                        props.onChange(
                            `${e.target.value}`
                        )
                    }}
                />
            </div>

        </div>
    )
}

export default InputPhone


interface InputSelectProps {
    label?: string
    placeholder: string
    options: {
        value: string
        label: string
        picture?: string
    }[]


    value: string
    onSelect: (value: string) => void

    style?: React.CSSProperties
}

function InputSelect({ options, placeholder, onSelect, style, value, label }: InputSelectProps) {
    //states
    const [selected, setSelected] = React.useState<string | null>(value ?? '+1')
    const [isOpen, setIsOpen] = React.useState(false)

    //handlers
    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }
    const handleSelect = (value: string, label: string) => {
        onSelect(value)
        setSelected(value)
        toggleDropdown()
    }

    return (
        <div className={styles.selectComponent}>
            {
                label &&
                <p style={{ color: "white", fontSize: '13px', marginBottom: '5px' }}>{label}</p>
            }
            <div
                style={{
                    ...style,
                }}
                onClick={toggleDropdown}
                className={styles.containerSelect}
            >
                {
                    value !== "" ?
                        <div
                            className='flex flex-row items-center justify-center gap-1'
                            style={{
                                width: '100%',


                            }}
                        >
                            {
                                selected &&
                                <img
                                    src={options.find(option => option.value === selected)?.picture}
                                    alt=""
                                    width={20}
                                    height={20}
                                />
                            }
                            <p>
                                {selected}
                            </p>
                        </div> :
                        <div style={{ color: '#ffffff80' }}>{placeholder}</div>
                }
                <ChevronDownIcon style={{ width: '20px' }} />
                {
                    isOpen &&
                    <div
                        className={styles.dropdown}
                        onMouseLeave={toggleDropdown}
                    >
                        {options.map((option, index) => (
                            <div key={index} onClick={() => handleSelect(option.value, option.label)} className={styles.option}>
                                {
                                    option.picture &&
                                    <img src={option.picture} alt="flag" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                                }
                                {option.label}
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    )
}




