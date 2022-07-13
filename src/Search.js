import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";

export default function Search() {
    const [info, setInfo] = useState([]);
    const [uriParam, setUriParam] = useState(null);
    const [name, setName] = useState('')
    const defaultPage = 1
    let [currentPage, setCurrentPage] = useState(defaultPage)
    const [totalCount, setTotalCount] = useState(0)
    const [lastPage, setLastPage] = useState(0)

    function parseLinkHeader(link) {
        const linksArray = link.split(", ").map(header => header.split("; "));
        const linksMap = linksArray.map(header => {
            const thisHeaderRel = header[1].replace(/"/g, "").replace("rel=", "");
            const thisHeaderUrl = header[0].slice(1, -1);
            return [thisHeaderRel, thisHeaderUrl]
        });
        return Object.fromEntries(linksMap);
    }

    useEffect(() => {
        if (uriParam) {
            const url = defaultPage === currentPage
                ? `https://api.github.com/search/users?q=${uriParam}&page${defaultPage}`
                : `https://api.github.com/search/users?q=${uriParam}&page${defaultPage}=&page=${currentPage}`;
            axios.get(url).then((res) => {
                setTotalCount(res.data.total_count)
                setInfo(res.data.items);
                let linksArray = parseLinkHeader(res.headers.link);
                let word = '&page='
                setLastPage(linksArray.last.substr(linksArray.last.indexOf(word) + word.length))
            });
        }
    }, [currentPage, lastPage, uriParam]);


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            setUriParam(name);
        }
    }

    function handleSearch() {
        setUriParam(name);
    }

    function handlePrev() {
        setCurrentPage(--currentPage)
    }

    function handleNext() {
        setCurrentPage(++currentPage)
    }

    function handleLast() {
        setCurrentPage(lastPage)
    }

    return (
        <div className="d-flex flex-column">
            <div className="mt-4">
                Search Users {totalCount > 0 ? ' : ' + totalCount + ' users' : ''}
            </div>
            <hr/>
            <div className="d-flex w-100 mx-auto my-auto">
                <input placeholder="Search GitHub..." type="text" className="me-2 rounded w-100 p-2" onChange={(e) => setName(e.target.value)} onKeyDown={handleKeyDown}/>
                <button className="btn btn-primary btn-sm" onClick={handleSearch}>Search</button>
            </div>
            <div className="mt-5">
                <ul>{info.map((item) => {
                    return <Link key={item.id} to={`/users/${item.login}`} className="text-decoration-none">
                        <li><h4>{item.login}</h4></li>
                    </Link>
                })} </ul>
            </div>
            <div className="d-flex">
                {currentPage > 1 ? <button className="btn btn-outline-info me-3" onClick={handlePrev}>Prev</button> : ''}
                {totalCount > 30 && currentPage < lastPage ? <button className="btn btn-outline-info me-3" onClick={handleNext}>Next</button> : ''}
                {totalCount > 30 && currentPage !== lastPage ? <button className="btn btn-outline-info" onClick={handleLast}>Last</button> : ''}
            </div>
        </div>
    )
}