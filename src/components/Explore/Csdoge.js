import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'

import { addrs, userid } from '../../abi/address'
import { Link, NavLink } from 'react-router-dom';
import ERC20 from '../../abi/ERC20.json'
import { Modal, Spinner, ProgressBar } from 'react-bootstrap'
import { IoIosAddCircle } from "react-icons/io";
import fromExponential from 'from-exponential'

// const BASE_URL = "https://my-json-server.typicode.com/themeland/netstorm-json/collections";

function Csdoge() {
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    // const [active, setactive] = useState('sales')
    // const [list, setlist] = useState([])
    // const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const [newlist, setnewlist] = useState([])
    // const [modcopies, setmodcopies] = useState()



    // const location = useLocation()
    // const [mainlist, setmainlist] = useState([])
    const [mainlistauc, setmainlistauc] = useState([])
    // const [arr, setArr] = useState([]);
    // const [arrauc, setArrauc] = useState([]);
    // const [price, setprice] = useState([])
    const [pricelast, setpricelast] = useState([])
    // const [pricearr, setpricearr] = useState()
    // const [payvalue, setpayvalue] = useState()
    // const [modaldatao, setmodaldatao] = useState()
    // const [modaldatac, setmodaldatac] = useState()
    // const [modaldatai, setmodaldatai] = useState()
    // const [modaldataaa, setmodaldataaa] = useState()
    // const [modaldatap, setmodaldatap] = useState()
    // const [modaldatacol, setmodaldatacol] = useState()
    // const [modaldatatok, setmodaldatatok] = useState()
    // const [allfixed, setallfix] = useState([])
    // const [allp, setallp] = useState([])
    // const [spin, setspin] = useState()
    const [tokenid, settokenid] = useState()
    // const [allprice, setallprice] = useState()
    const [cklist, setcklist] = useState([])
    const [accountid, setaccountid] = useState()
    const [burnc, setburnc] = useState()
    const [bar, setbar] = useState()
    console.log('barr', bar)
    const adminid = "0x6a17a6be25b2bbbd3f6dce4444ffc016aec77fc3"
    useEffect(async () => {
        nftidnew()
        const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setaccountid(accounts1[0])


    }, [])
    const nftidnew = async () => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.csdogenft().call({ from: userwalletaddresss })
                .then((id) => {
                    console.log("id", id);
                    var listlen = id?.length
                    // console.log('bn',length[0])
                    for (let i = 0; i < listlen; i++) {
                        // console.log(`akk${i}`,length[0][i])
                        console.log(id[i])
                        nftinfo(id[i])
                        salenftprie(id[i])
                        tokeninfo(id[i])


                    }
                })
                .catch()
        }
    }
    const nftinfo = async (id) => {
        // console.log('4')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.nftinformation(id).call({ from: userwalletaddresss })
                .then((fees) => {
                    // console.log(`detail${id}`,fees);
                    // setspin(fees)
                    savelist(fees)
                    // localStorage.setItem(`buylist${id}`, JSON.stringify(fees))
                    // setArr(id)
                    // salenftprie(fees[0])
                    console.log(fees)


                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }

    const salenftprie = async (id) => {
        // console.log('riht',id)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    const val = {
                        id: id, value: length[3]
                    }
                    console.log('aaaprice', length);
                    // setlist(length[1])
                    // setlist2(length[1])
                    // localStorage.setItem(`normasale${id}`, (length[3]))
                    // setpricearr(id)
                    getallprice(val)
                })
                .catch()

        }
    }
    const getallprice = (data) => {
        if (data.id === "0") {
            // console.log('notallowed',data)
        } else {
            // console.log('dataaallower',data)
            setallp((old) => [
                ...old, data
            ])

        }

    }
    const buyfixednft = async (collectionid, tokenid) => {
        console.log('buy nft fix')
        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000


        if (window.ethereum && ckamout) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("ckamout", ckamout);
            settokenid(accounts)
            setShow(true)
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            let amountIn = window.web3.utils.toBN(fromExponential((ckamout) * Math.pow(10, 18)));
            console.log('amout', amountIn)
            let address = '0x0000000000000000000000000000000000000000'
            swaping.methods.buynft(collectionid, tokenid, address).send({ from: userwalletaddresss, value: amountIn })
                .then((recipt) => {
                    // console.log(recipt);
                    setShow(false)
                    localStorage.removeItem(`buylist${tokenid}`)
                    window.location.reload(true)
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })

        }
    }
    console.log('price', pricelast)
    const tokeninfo = async (tokenid) => {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            swaping.methods.csdogeinfo(tokenid).call({ from: userwalletaddresss })
                .then((fees) => {
                    const val = {
                        id: tokenid,
                        ck: fees[0],
                        copy: Number(fees[1]),
                        total: Number(fees[2])
                    }
                    checklist(val)


                })
                .catch()

        }
    }
    const checklist = (data) => {
        setcklist((old) => [
            ...old, data
        ])

    }
    console.log("listt", cklist)

    console.log(cklist)
    const buycsdoge = async (collectionid, tokenid) => {
        console.log('buy csdoe')

        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000
        setShow(true)
        if (window.ethereum && ckamout) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            console.log('all', ckamout)

            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let tokenaddress = '0x323EF358D589F448289Bf84494F869DA869E4F4e';
            const ercContract = await new window.web3.eth.Contract(ERC20, tokenaddress);
            let amountADesired = window.web3.utils.toBN(fromExponential(parseInt((parseFloat(ckamout)) * Math.pow(10, 18))));
            ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                .then((res) => {
                    console.log(res);
                    let swaping = new window.web3.eth.Contract(nft, addrs)
                    swaping.methods.buynft(collectionid, tokenid, tokenaddress).send({ from: userwalletaddresss })
                        .then((fees) => {
                            console.log(fees);
                            window.location.reload()
                            setShow(false)
                        }).catch()
                })
                .catch(() => {
                    setShow(false)

                })
        }
    }
    const buycopiesnft = async (tokenid, boolvalue) => {
        console.log('buy copy')
        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000
        setShow(true)
        console.log('ckamout', ckamout)

        if (window.ethereum && ckamout) {

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("copysale", ckamout);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)
            if (boolvalue) {
                let tokenaddress = '0x323EF358D589F448289Bf84494F869DA869E4F4e';
                const ercContract = await new window.web3.eth.Contract(ERC20, tokenaddress);
                let amountADesired = window.web3.utils.toBN(fromExponential(parseInt((parseFloat(ckamout)) * Math.pow(10, 18))));
                ercContract.methods.approve(addrs, amountADesired).send({ from: userwalletaddresss })
                    .then((res) => {
                        console.log(res);
                        let swaping = new window.web3.eth.Contract(nft, addrs)
                        swaping.methods.buycopies(tokenaddress, tokenid).send({ from: userwalletaddresss })
                            .then((fees) => {
                                console.log(fees);
                                window.location.reload()
                            }).catch(() => {
                                setShow(false)
                            })
                    })
                    .catch(() => {
                        setShow(false)

                    })
            }
            else {
                let amountIn = window.web3.utils.toBN(fromExponential((ckamout) * Math.pow(10, 18)));
                console.log('amout', amountIn)
                let tokenaddress = '0x0000000000000000000000000000000000000000'
                swaping.methods.buycopies(tokenaddress, tokenid).send({ from: userwalletaddresss, value: amountIn })
                    .then((recipt) => {
                        // console.log(recipt);
                        setShow(false)
                        localStorage.removeItem(`buylist${tokenid}`)
                        window.location.reload(true)
                    })
                    .catch((err) => {
                        setShow(false)
                        settokenid('')
                    })

            }
        }
    }
    const burncopiesnft = async (tokenid, copiesnumber) => {
        console.log("id", tokenid)
        console.log("cop", copiesnumber)
        setShow(true)
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.burncopies(copiesnumber, tokenid).send({ from: userwalletaddresss })
                .then((fees) => {
                    console.log(fees);
                    setShow(false)
                    window.location.reload()
                })
                .catch(() => {
                    setShow(false)
                })

        }
    }

    return (


        <section className="popular-collections-area csdogemain">
            <div className="container-fuild px-3">
                <div className="row">
                    <div className="col-12">
                        {/* Intro */}
                        {/* {
                            accountid === userid ? <NavLink to="/createcsdoge">
                                <button className="d-block btn btn-bordered-white mt-4 w-100">Create CSdoge</button>
                            </NavLink> : null
                        } */}

                        <div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>CSDOGE</span>
                                <h3 className="mt-3 mb-0">CSDOGE</h3>
                            </div>
                            {/* <div className="intro-btn">
                                    <a className="btn content-btn text-left" href="/explore-2">{this.state.data.btnText}</a>
                                </div> */}
                        </div>
                    </div>
                </div>
                <div className="row items">
                {
                            accountid === userid ?
                    <div className="col-12 csmain col-sm-6 col-lg-3 item">
                        <div className="card no-hover text-center" style={{height:'470px'}}>
                            
                            {/* Card Caption */}
                            



                                <div className="card-body">
                                <NavLink to="/createcsdoge">
                                    <IoIosAddCircle style={{fontSize:'300px',color:'#99B7FF'}} />
                                    </NavLink>



                                    <div className="card-bottom mt-3 text-center">
                                        <h3 style={{fontSize:'28px'}} className="m-0">CREATE</h3>
                                        <h3 style={{fontSize:'28px'}}>CSDOGE</h3>

                                    </div>
                                    <div >

                                    </div>

                                </div>
                            
                        </div>
                    </div>:null
}
                    {allfixed?.map((val, id) => {
                        return (
                            <div key={`cd_${id}`} className="col-12 csmain col-sm-6 col-lg-3 item">
                                <div className="card no-hover text-center">
                                    <div className="image-over csimg">
                                        <Link to={{
                                            pathname: "/cs-details",
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
                                    <div className="card-caption col-12 p-0 csdetail">
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
                                        <Link to={{
                                            pathname: "/cs-details",
                                            state: val
                                        }}>

                                            <h5 style={{ textTransform: 'capitalize' }} className="mb-0">{val ? val[1] : null}</h5>

                                        </Link>

                                        <div className="card-body">

                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                burncopiesnft(val[0], burnc)
                                            }}>
                                                {
                                                    accountid === userid ? <span style={{ display: 'flex', alignItems: 'center' }}>
                                                        <input type="number" min="0" style={{ border: 'none', outline: 'none' }} placeholder="Burn Copies Number" onChange={(e) => setburnc(e.target.value)} required />
                                                        <button type="submit" className="btn btn-bordered-white btn-smaller mt-3">Burn</button>
                                                    </span> : null
                                                }

                                            </form>
                                            <div className="seller d-flex align-items-center">
                                                <span >Owned By</span>
                                                <Link to={{
                                                    pathname: "/cs-details",
                                                    state: val
                                                }}>
                                                    <h6 style={{ textTransform: 'capitalize' }} className="ml-2 mb-0">{val ? val[3] : null}</h6>
                                                </Link>

                                            </div>
                                            <div className="card-bottom d-flex justify-content-between">
                                                {allp.map((vala) => {

                                                    if (vala.id === val[0]) {
                                                        return <span>{vala?.value?.length > 21 ? allp[id]?.value / 1000000000000000000000000000000000000 : vala?.value / 1000000000000000000} {cklist.map((vala) => {
                                                            if (vala.id === val[0]) {
                                                                return <>
                                                                    {
                                                                        vala.ck ? "CSDOGE" : "BNB"
                                                                    }
                                                                </>
                                                            }
                                                        })} </span>

                                                    }


                                                })}
                                                {
                                                    cklist?.map((ck, i) => {
                                                        if (ck.id === val[0]) {
                                                            return <span >{ck.copy} of {ck.total} </span>

                                                        }

                                                    })
                                                }


                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                {
                                                    cklist?.map((ck, i) => {
                                                        if (ck.id === val[0]) {
                                                            return <ProgressBar className="mx-3" now={100 - (ck.copy / ck.total) * 100} />

                                                        }

                                                    })
                                                }
                                            </div>

                                            {cklist.map((vala) => {
                                                if (vala.id === val[0]) {
                                                    return <>
                                                        {
                                                            vala.copy === 0 ? vala.ck ? <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buycsdoge(val[7], val[0])}>Buy</button> : <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buyfixednft(val[7], val[0])}>Buy</button> : vala.ck ? <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buycopiesnft(val[0], true)}>Buy CSDOGE</button> : <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buycopiesnft(val[0], false)}>Buy CSDOGE</button>
                                                        }

                                                    </>
                                                }
                                            })}
                                            {/* <button onClick={()=>setbar(cklist?.map((ck,i)=>{
                                                if(ck.id === val[0]){
                                                    return (ck.copy/ck.total )*100

                                                }
                                                
                                            })
                                            )}>ck</button> */}
                                            {

                                            }
                                            {/* <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => buyfixednft(val[7], val[0])}><i className="icon-handbag mr-2" />Buy sale</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >

                    <Modal.Body>


                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}><Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                            <Spinner animation="grow" variant="light" />
                        </div>






                    </Modal.Body>
                </Modal>
            </div>
        </section>
    );
}


export default Csdoge;