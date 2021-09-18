import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link,useParams } from 'react-router-dom';

import { addrs } from '../../abi/address'

function ExploreTwo({ colid }) {
    const [colllist, setcolllist] = useState()
    // const [assetist, setassetlist] = useState()
    // const [allcolllist, allsetcolllist] = useState([])
    // const [active, setactive] = useState('sales')
    const [alldata, setalldata] = useState([])
    const [show, setshow] = useState(false)
    // const [aldatafil, setaldatafil] = useState(alldata)
    const [result, setresult] = useState([])
    const [resulta, setresulta] = useState([])
    const { word } = useParams()
    // console.log('aashie', word)
    const [assetist, setassetlist] = useState()
    const [allcolllist, allsetcolllist] = useState([])
    // const [allmaindata,setallmaindata] = useState()
    // const [subdata,setsubdata] = useState([])
    // const [subdata2,setsubdata2] = useState([])    
    // const [subdata3,setsubdata3] = useState([])
    const [accountid,setaccountid] = useState()
    
    useEffect(async() => {
        totalcolection()
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1)

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
                })
                .catch()

        }
    }
    useEffect(() => {
        for (let i = 1; i <= colllist; i++) {
            collectiondetails(i);
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
                    // setactive(id)
                    getalllist(fees)


                }).catch()

        }
    }

    const getalllist = (data) => {
        setalldata((old) => [
            ...old, data
        ])


    }
    useEffect(()=>{
        totalnft()
    },[])
     
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
     const getallasset = (data)=>{
         allsetcolllist(old=>[
             ...old,data
         ])
 
     }
     
    
    // setallmaindata([alldata,allcolllist])

    // console.log('alladata', aldatafil)
    useEffect(() => {

        if (word !== "") {
            // console.log('aaa', word)
            const newlist = alldata.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            setresult(newlist)
        }

    }, [word,alldata])
    useEffect(() => {

        if (word !== "") {
            // console.log('aaa', word)
            const newlist = allcolllist.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
            })
            setresulta(newlist)
        }

    }, [word,allcolllist])
    console.log('result',result)
    // useEffect(() => {

    //     if (word !== "") {
    //         // console.log('aaa', word)
    //         const newlist = coldata.filter((con) => {
    //             return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
    //         })
    //        setsubdata(newlist)
    //     }

    // }, [word,allcolllist])
    // useEffect(() => {

    //     if (word !== "") {
    //         // console.log('aaa', word)
    //         const newlist = data2.filter((con) => {
    //             return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
    //         })
    //        setsubdata2(newlist)
    //     }

    // }, [word,allcolllist])
    // useEffect(() => {

    //     if (word !== "") {
    //         // console.log('aaa', word)
    //         const newlist = data1.filter((con) => {
    //             return Object.values(con).join(" ").toLowerCase().includes(word.toLowerCase())
    //         })
    //        setsubdata3(newlist)
    //     }

    // }, [word,allcolllist])
    // console.log('result2',resulta)

   
    return (
     
        <section className="popular-collections-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Search {word}</span>
                                <h3 className="mt-3 mb-0">Assets</h3>
                            </div>
                            {/* <div className="intro-btn">
                                <a className="btn content-btn text-left" href="/explore-1">More</a>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="row items">
                    {result?.map((val, idx) => {
                        return (
                            <>
                            {
                                val[0]==="1"?null:
                            
                            <div key={`cd_${idx}`} className="col-12 cscard col-sm-6 alist col-lg-3 item">
                                    <div className="card no-hover text-center">
                                        <div className="image-over maincolimg">
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
                                                    <h5 style={{textTransform:'capitalize'}} className="mb-2">{val? val[2]:null}</h5>
                                                </Link>
                                                <span style={{textTransform:'capitalize'}}>{val? val[3]:null}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                </>
                        );
                      
                    })}
                     {resulta?.map((val, idx) => {
                        return (
                            <div key={`cd_${idx}`} className="col-12 col-sm-6 alist col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over mynft">
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
                                        <div className="card-body">
                                            <Link to={{
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


export default ExploreTwo;