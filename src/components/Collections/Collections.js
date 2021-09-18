import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'


import {addrs} from '../../abi/address'
import { Link } from 'react-router-dom';
// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/collections";

function Collections () {
    const [colllist, setcolllist] = useState()
    // const [assetist, setassetlist] = useState()
    // const [allcolllist, allsetcolllist] = useState([])
    const [active, setactive] = useState('sales')
    const [alldata, setalldata] = useState([])
    const [show, setshow] = useState(false)
    // const [aldatafil, setaldatafil] = useState(alldata)
    // const [result, setresult] = useState([])
    const [spi, setspin] = useState()
    const [accountid, setaccountid] = useState()
    // useEffect(()=>{
    //     console.log('aas',props.sdata)
    //     if(props.data === "no data"){
    //         alert('data')
    //         setresult(alldata)

    //     }
    //     else{
    //         // console.log('main',ser)
    //         const fil = aldatafil.filter((c)=>{
    //            return Object.values(c).join(" ").toLowerCase().includes(props.data.toLowerCase());
    //         })
    //         // setmaindata(fil)
    //         // setresult(fil)
    //     }
    // },[props.sdata])
    // console.log('alkoiu', accountid)
    useEffect(async () => {
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)
        totalcolection()

    }, [])
    const totalcolection = async () => {

        if (window.ethereum) {
            setshow(true)

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectionform().call({ from: userwalletaddresss })
                .then((length) => {
                    setcolllist(length)
                    console.log('lklength', length)

                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
            setspin(i)
        }


    }, [colllist])
    const collectiondetails = async (id) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.collectiondetails(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log("fff", fees);
                    setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }

    const getalllist = (data) => {
        setalldata((old) => [
            ...old, data
        ])


    }
    console.log('aall', alldata)
  
    
        return (
            
            <section className="popular-collections-area collec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            {/* Intro */}
                            <div className="intro d-flex justify-content-between align-items-end m-0">
                                <div className="intro-content">
                                    <span>Collections</span>
                                    <h3 className="mt-3 mb-0">Collections</h3>
                                </div>
                                <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/allcol">More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row items">
                        {alldata?.map((val, idx) => {
                            return (
                                <>
                                {
                                    val[0]==="1"?null:
                                
                                
                                <div key={`cd_${idx}`} className="cscard col-12 col-sm-6 col-lg-3 item">
                                    <div className="card no-hover text-center">
                                        <div className="image-over maincolimg" >
                                            <Link to={{
                                                pathname:"/col-details",
                                                state:val
                                            }} >
                                                <img className="card-img-top" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                            </Link>
                                            {/* Seller */}
                                            <Link className="seller" to={{
                                                pathname:"/col-details",
                                                state:val
                                            }}>
                                                <div className="seller-thumb avatar-lg">
                                                    <img className="rounded-circle" src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
                                                </div>
                                            </Link>
                                        </div>
                                        {/* Card Caption */}
                                        <div className="card-caption col-12 p-0">
                                            {/* Card Body */}
                                            <div className="card-body mt-4">
                                            <Link to={{
                                                pathname:"/col-details",
                                                state:val
                                            }} >
                                                    <h5 style={{fontSize:'20px',textTransform:'capitalize'}} className="mb-2">{val? val[2]:null}</h5>
                                                </Link>
                                                <span>{val? val[3]:null}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                                </>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }


export default Collections;