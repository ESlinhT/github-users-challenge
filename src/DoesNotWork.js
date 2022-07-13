import React from 'react'
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";


export default function DoesNotWork() {
    let params = useParams();
    return (
        <div className="text-center mt-5">
            <span className="text-info fw-bold" style={{fontSize: '3em'}}>This feature does not work.</span>
            <Link to={`/users/${params.id}`} className="text-decoration-none">
                <h1>Back</h1>
            </Link>
        </div>
    )
}