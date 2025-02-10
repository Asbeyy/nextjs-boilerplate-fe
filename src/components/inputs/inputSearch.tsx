import { useEffect, useState, useRef } from 'react';
import styles from './input.module.css'
import LoaderWhite from '../loaders/LoaderWhite';



interface searchbarProps {
    width?: string;
    placeholder: string;
    searchPathApi?: string;
    onSave?: (results: any) => void;
    onSearch?: (search: string) => void;
    isSearching?: boolean;

    isDropdown?: boolean,
    href?: string,
    //style?: React.CSSProperties,
}


function Searchbar({ width, placeholder, searchPathApi, onSave, onSearch, isSearching, isDropdown, href }: searchbarProps) {
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
        const value = e.target.value;
        setSearchParam(value);


        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            if (onSearch) {
                onSearch(value); // Call onSearch after 500ms
            }
        }, 300);
    };


    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);







    return (
        <div className={styles.container} style={{ width: width ? width : '100%' }}>
            <div className={styles.searchBox}>
                <input
                    placeholder={placeholder}
                    value={searchParam}
                    onChange={handleInputChange}
                    className={styles.input}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    style={{fontSize: '13px'}}
                />
                <span style={{position: 'relative'}}>
                    {
                        !isSearching &&
                        <svg
                            className={styles.searchIcon}
                            style={{
                                transform: isFocused && !isSearching ? "translate(0px, -10px)" : "translate(-10px, -10px)",
                                opacity: isFocused && !isSearching ? 0 : 1,
                                position: "absolute",
                                top: "50%",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            height="22px"
                            viewBox="0 -960 960 960"
                            width="20px"
                            fill="#e8eaed"
                        >
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                    }
                    {
                        
                        <div

                            className={styles.searchIcon}
                            style={{
                                transform: !isSearching ? "translate(0px, -10px)" : "translate(-12px, -10px)",
                                opacity: !isSearching ? 0 : 1 ,
                                position: "absolute",
                                top: "50%",
                            }}
                        >
                            <LoaderWhite/>
                        </div>
                    }
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