import React from 'react'
import styles from './input.module.css'
import { ChevronDownIcon } from '@heroicons/react/24/outline'


interface InputSelectProps {
    label?: string
    placeholder: string
    options: {
        value: string
        label: string
    }[]


    value: string
    onSelect: (value: string) => void

    style?: React.CSSProperties
}

function InputSelect({ options, placeholder, onSelect, style, value, label }: InputSelectProps) {
    //states
    const [selected, setSelected] = React.useState<string | null>(null)
    const [isOpen, setIsOpen] = React.useState(false)

    //handlers
    const toggleDropdown = () => {
        setIsOpen(prev => !prev)
    }
    const handleSelect = (value: string, label: string) => {
        onSelect(value)
        setSelected(label)
        toggleDropdown()
    }

    return (
        <div className={styles.selectComponent}>
            {
                label &&
                <p style={{ color: "white", fontSize: '13px', marginBottom: '5px' }}>{label}</p>
            }
            <div style={style} onClick={toggleDropdown} className={styles.containerSelect}>
                {
                    value !== "" ?
                        <div>{selected}</div> :
                        <div style={{color: '#ffffff80'}}>{placeholder}</div>
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
                                {option.label}
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    )
}

export default InputSelect