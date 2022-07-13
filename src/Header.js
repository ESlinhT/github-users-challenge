import React from 'react'
import {Link} from "react-router-dom";


export default function Header() {

    return (
        <header className="text-info fw-bold text-center mb-4">
            <Link to={'/'} className="text-decoration-none">
                <span style={{fontSize: '3em'}}>GitHub Users API</span>
            </Link>
            <hr/>
        </header>
    )
}