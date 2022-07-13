import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default function Search() {
    const url = "https://api.github.com/search/users?q=";
    const [info, setInfo] = useState([]);
    const [uriParam, setUriParam] = useState('');
    const [name, setName] = useState('')

    useEffect(() => {
        if (uriParam)
            axios.get(url + uriParam).then((res) => {
                setInfo(res.data.items);
            });
    }, [uriParam]);

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            setUriParam(name);
        }
    }

    function handleSearch() {
        setUriParam(name);
    }

    return (
        <div className="d-flex flex-column">
            <div className="mt-4">
                Search Users
            </div>
            <hr/>
            <div className="d-flex w-100 mx-auto my-auto">
                <input placeholder="Search GitHub..." type="text" className="me-2 rounded w-100 p-2" onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown}/>
                <button className="btn btn-primary btn-sm" onClick={handleSearch}>Search</button>
            </div>
            <div className="text-center mx-auto mt-5">
                <ul>{info.map((item) => {
                    return <Link to={`/users/${item.login}`} className="text-decoration-none">
                        <h1>{item.login}</h1>
                    </Link>
                })} </ul>
            </div>
        </div>
    )
}