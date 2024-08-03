import { useEffect, useState } from 'react';
import styles from './input.module.css'
import { search, searchAll } from '@/services/api';


interface searchbarProps {
    placeholder: string;
    searchPathApi: string;
    onSave: (results: any) => void;

    isDropdown?: boolean,
    href?: string,
    //style?: React.CSSProperties,
}


function Searchbar({ placeholder, searchPathApi, onSave, isDropdown, href }: searchbarProps) {
    //States
    const [isFocused, setIsFocused] = useState(false)
    const [searchParam, setSearchParam] = useState("")
    const [allData, setAllData] = useState([])
    const [dropdownData, setDropdownData] = useState([])

    //Handlers
    const handleOnFocus = () => {
        setIsFocused(true)
    }
    const handleOnBlur = () => {
        setIsFocused(false)
    }
    const handleInputChange = (e: any) => {
        setSearchParam(e.target.value)
    }
    const handleSearchAll = async () => {
        const call = await searchAll(searchPathApi)

        if (call.success) {
            console.log(call.data)
            setAllData(call.data)
            onSave(call.data)
        }
    }
    const handleSearch = async (searchParam: string) => {
        if (searchParam.length == 0) {
            if (isDropdown){
                setDropdownData([])
                return
            }
            onSave(allData)
            return
        }

        const call = await search(searchParam, searchPathApi)

        if (call.success) {
            if (isDropdown) {
                setDropdownData(call.data)
                return
            }
            onSave(call.data)
        }

    }

    //Effects
    useEffect(() => {
        handleSearch(searchParam)
    }, [searchParam])

    useEffect(() => {
        if (isDropdown) return

        handleSearchAll()
    }, [])



    return (
        <div className={styles.container}>
            <div className={styles.searchBox}>
                <input
                    placeholder={placeholder}
                    value={searchParam}
                    onChange={handleInputChange}
                    className={styles.input}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                />
                <span>
                    <svg
                        className={styles.searchIcon}
                        style={{
                            transform: isFocused ? "translate(15px, 2px)" : "translate(0px, 2px)",
                            opacity: isFocused ? 0 : 1,
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="22px"
                        viewBox="0 -960 960 960"
                        width="20px"
                        fill="#e8eaed"
                    >
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
                </span>

            </div>
            {
                isDropdown &&
                dropdownData.length > 0 &&
                <div className={styles.dropdown}>
                    {
                        dropdownData.map((data: any, index: number) => (
                            <a 
                                key={data._id}
                                href={href}
                            >
                                {data.user.name}
                            </a>
                        ))
                    }
                </div>
            }

        </div>

    )
}

export default Searchbar;