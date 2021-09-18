import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'

import {addrs} from '../../abi/address'
import { Link } from 'react-router-dom';

const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/collections";

function Allasset ({allnft}) {
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    const [show, setshow] = useState(false)
    const [spin, setspin] = useState()

    const [accountid, setaccountid] = useState()

    useEffect(async () => {
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)
        totalnft()
    }, [])

    const totalnft = async () => {
        if (window.ethereum) {
            setshow(true)
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.tokenidmint().call({ from: userwalletaddresss })
                .then((length) => {

                    setassetlist(length)
                    
                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= assetist; i++) {
            nftinfo(i);
            setspin(i)


        }


    }, [assetist])

    const nftinfo = async (id) => {
        console.log('four fun')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {

                    getallasset(fees)

                }).catch()

        }
    }
    const getallasset = (data) => {
        allsetcolllist(old => [
            ...old, data
        ])

    }

    console.log('aasd', allcolllist)
    
        return (
            
            <section className="explore-area allasset">
            <div className="container-fuild">
                <div className="row px-3">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>ALL NFTs</span>
                                <h3 className="mt-3 mb-0">Sale</h3>
                            </div>
                            {
                                allnft==="allnft"?null:<div className="intro-btn">
                                <a className="btn content-btn text-left" href="/allnft">More</a>
                            </div>
                            }
                            
                        </div>
                        
                        
                    </div>
                </div>
                <div className="row items px-3 ">
                    {allnft==="allnft"?
                    allcolllist?.map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                            <div className="card no-hover text-center">
                                <div className="image-over mynft" > 
                                    <Link to={{
                                        pathname: "/item-details",
                                        state: val
                                    }} >
                                        <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                    </Link>
                                    {/* Seller */}
                                    {/* <Link className="seller" to={{
                                        pathname:"/col-details",
                                        state:val
                                    }}>
                                        <div className="seller-thumb avatar-lg">
                                            <img className="rounded-circle" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                        </div>
                                    </Link> */}
                                </div>
                                {/* Card Caption */}
                                <div className="card-caption col-12 p-0">
                                    {/* Card Body */}
                                    {/* <div className="card-body mt-4">
                                    <Link to={{
                                        pathname:"/col-details",
                                        state:val
                                    }} >
                                            <h5 className="mb-2">{val? val[2]:null}</h5>
                                        </Link>
                                        <span>{val? val[3]:null}</span>
                                    </div> */}
                                    <div className="card-body px-2 mynftdes">
                                        <Link style={{display:'flex'}} to={{
                                            pathname: "/item-details",
                                            state: val
                                        }} >
                                            <h5 style={{textTransform:'capitalize'}} className="mb-0">{val ? val[1] : null}</h5>
                                        </Link>

                                        <div className="seller d-flex align-items-center my-3">
                                            <span>Owned By</span>
                                            <Link to={{
                                                pathname: "/item-details",
                                                state: val
                                            }} >
                                                <h6 style={{textTransform:'capitalize'}} className="ml-2 mb-0">{val ? val[3] : null}</h6>
                                            </Link>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        );
                    }): allcolllist?.slice(0,4).map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                            <div className="card no-hover text-center">
                                <div className="image-over mynft" > 
                                    <Link to={{
                                        pathname: "/item-details",
                                        state: val
                                    }} >
                                        <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                    </Link>
                                    {/* Seller */}
                                    {/* <Link className="seller" to={{
                                        pathname:"/col-details",
                                        state:val
                                    }}>
                                        <div className="seller-thumb avatar-lg">
                                            <img className="rounded-circle" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                        </div>
                                    </Link> */}
                                </div>
                                {/* Card Caption */}
                                <div className="card-caption col-12 p-0">
                                    {/* Card Body */}
                                    {/* <div className="card-body mt-4">
                                    <Link to={{
                                        pathname:"/col-details",
                                        state:val
                                    }} >
                                            <h5 className="mb-2">{val? val[2]:null}</h5>
                                        </Link>
                                        <span>{val? val[3]:null}</span>
                                    </div> */}
                                    <div className="card-body px-2 mynftdes">
                                        <Link style={{display:'flex'}} to={{
                                            pathname: "/item-details",
                                            state: val
                                        }} >
                                            <h5 style={{textTransform:'capitalize'}} className="mb-0">{val ? val[1] : null}</h5>
                                        </Link>

                                        <div className="seller d-flex align-items-center my-3">
                                            <span>Owned By</span>
                                            <Link to={{
                                                pathname: "/item-details",
                                                state: val
                                            }} >
                                                <h6 style={{textTransform:'capitalize'}} className="ml-2 mb-0">{val ? val[3] : null}</h6>
                                            </Link>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
               
            </div>
        </section>
        );
    }


export default Allasset;