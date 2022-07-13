import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function User() {
    const attr_array = [
        'login',
        'type',
        'name',
        'company',
        'blog',
        'location',
        'email',
        'bio',
        'twitter_username',
        'public_repos',
        'public_gists',
        'followers',
        'following',
        'created_at',
        'updated_at',
    ]
    let params = useParams();
    const [info, setInfo] = useState([]);
    const [repos, setRepos] = useState([]);
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const url = "https://api.github.com/users/";
        axios.get(url + params.id).then((res) => {
            setInfo(res.data);
        });
        if (info.starred_url) {
            axios.get(`https://api.github.com/users/${info.login}/starred`).then((res) => {
                setStars(res.data);
            });
        }
        if (info.repos_url) {
            axios.get(info.repos_url).then((res) => {
                setRepos(res.data);
            });
        }
    }, [info.login, info.repos_url, info.starred_url, params.id]);


    return (
        <>
            <div className="d-flex mx-5">
                <div className="mt-5">
                    <img src={info.avatar_url} alt="" className="rounded-circle" height="300" width="300"/>
                    <h4 className="text-white text-center mt-4">{info.login}</h4>
                    {/*<Link to={`/users/${info.login}/does-not-work`}>*/}
                    {/*    <button className="btn w-25 bg-dark text-white border-white">Follow</button>*/}
                    {/*</Link>*/}
                </div>
                <div className="d-flex flex-column ms-5">
                    <Tabs defaultActiveKey="overview"
                        transition={false}
                        id="myTabContent"
                        className="mb-3" style={{width: '40em'}}>
                        <Tab eventKey="overview" title="Overview">
                            <div>
                                <h4>Repositories</h4>
                                <h6 className="text-center my-3">{info.public_repos > 0 ? info.login + ' has ' + info.public_repos + ' public repos.' : info.login + ' does not have any public repos.'}</h6>
                                <h4>Information</h4>
                                {attr_array.map((attr) => {
                                    return <div key={attr} className="d-flex justify-content-between">
                                        <p className="my-auto text-capitalize">{attr}:</p>
                                        <h6 className="my-auto text-info">{info[attr]}</h6>
                                    </div>
                                })}
                            </div>
                        </Tab>
                        <Tab eventKey="repositories" title="Repositories">
                            {info.public_repos > 0
                                ? <ul> {repos.map((repo) => {
                                    return <li key={repo.id} className="list-unstyled text-center">{repo.name}</li>
                                })} </ul>
                                : <h6 className="text-center my-5"> {info.login + ' does not have any public repos.'}</h6>}
                        </Tab>
                        <Tab eventKey="stars" title="Stars">
                            {info.starred_url
                                ? <ul> {stars.map((star) => {
                                    return <li key={star.id} className="list-unstyled text-center">{star.name}</li>
                                })} </ul>
                                : <h6 className="text-center my-5"> {info.login + ' does not have any starred repos.'}</h6>}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    )
}