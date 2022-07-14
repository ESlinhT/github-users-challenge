import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

export default function Repo() {
    let params = useParams();
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const url = "https://api.github.com/repos/";
        axios.get(url + params.id + '/' + params.name).then((res) => {
            setInfo(res.data);
        });
    }, []);


    return (
        <>
            <div className="d-flex mx-5">
                <div className="mt-5">
                    <img src="data:image/png;base64,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" alt="" className="rounded" height="300" width="300"/>
                    <h4 className="text-white text-center mt-4 text-capitalize">{info.name}</h4>
                </div>
                <div className="d-flex flex-column mx-5 mt-5 w-100">
                    <h3 className="text-center mb-4">Repo Basic Information</h3>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto text-capitalize">Name :</p>
                        <h5 className="my-auto text-info text-capitalize">{info.name}</h5>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto text-capitalize">ID :</p>
                        <h6 className="my-auto text-info">{info.id}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto text-capitalize">Created At : </p>
                        <h6 className="my-auto text-info">{info.created_at}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto text-capitalize">HTML Url : </p>
                        <a className="text-decoration-none" href={info.html_url} target="_blank" rel="noreferrer"><h6 className="my-auto text-info">{info.html_url}</h6></a>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto text-capitalize">Subscribers Count : </p>
                        <h6 className="my-auto text-info">{info.subscribers_count}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p className="my-auto text-capitalize">Visibility : </p>
                        <h6 className="my-auto text-info">{info.visibility}</h6>
                    </div>
                    <Link to={`/users/${params.id}`} className="text-decoration-none text-center btn btn-info mt-5">
                        <h5 className="fw-bold">Return to User</h5>
                    </Link>
                </div>
            </div>
        </>
    )
}