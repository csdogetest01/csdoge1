import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import Web3 from 'web3'
import nft from '../../abi/nft.json'
import { Link,useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'
import { Modal, Spinner } from 'react-bootstrap'


import { addrs } from '../../abi/address'
import fromExponential from 'from-exponential'



function ExploreOne({sale}) {
    const [list, setlist] = useState([])
    // const [list2, setlist2] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [newlist, setnewlist] = useState([])

    // const location = useLocation()
    const history = useHistory()
    // const [mainlist, setmainlist] = useState([])
    // const [mainlistauc, setmainlistauc] = useState([])
    const [arr, setArr] = useState([]);
    // const [arrauc, setArrauc] = useState([]);
    const [price, setprice] = useState([])
    const [pricearr, setpricearr] = useState()
    const [payvalue, setpayvalue] = useState()
    // const [modaldatao, setmodaldatao] = useState()
    // const [modaldatac, setmodaldatac] = useState()
    // const [modaldatai, setmodaldatai] = useState()
    // const [modaldataaa, setmodaldataaa] = useState()
    // const [modaldatap, setmodaldatap] = useState()
    // const [modaldatacol, setmodaldatacol] = useState()
    // const [modaldatatok, setmodaldatatok] = useState()
    const [allfixed, setallfix] = useState([])
    const [allp, setallp] = useState([])
    const [spin, setspin] = useState()
    const [tokenid, settokenid] = useState()
    const [allprice, setallprice] = useState()
    const [dogid, setdogid] = useState([])
    const [colllist, setcolllist] = useState()
    const [alldata, setalldata] = useState([])
    useEffect(() => {
        // console.log('1')

        salenft(0)
        nftidnew()

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
                    setdogid(id)
                    var listlen = id?.length
                    // console.log('bn',length[0])
                    // for (let i = 0; i < listlen; i++) {
                    //     // console.log(`akk${i}`,length[0][i])
                    //     // console.log(id[i])
                    //     // nftinfo(id[i])
                    //     // salenftprie(id[i])

                    // }
                })
                .catch()
        }
    }

    const salenft = async (id) => {
        // console.log('2')
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            let userwalletaddresss = accounts[0];
            window.web3 = new Web3(window.ethereum);
            let swaping = new window.web3.eth.Contract(nft, addrs)

            swaping.methods.listofsalenft(id).call({ from: userwalletaddresss })
                .then((length) => {
                    // console.log('aaa', length);
                    setlist(length[0])
                    // setlist2(length[1])
                    console.log('listone', length[0])
                    var listlen = length[0]?.length
                    // console.log('bn',length[0])
                    for (let i = 0; i < listlen; i++) {
                        // console.log(`akk${i}`,length[0][i])
                        const ll = length[0][i]
                        nftinfo(ll)

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
                    console.log(`detail${id}`, fees);
                    setspin(fees)
                    savelist(fees)
                    localStorage.setItem(`buylist${id}`, JSON.stringify(fees))
                    setArr(id)
                    salenftprie(fees[0])


                }).catch()

        }
    }
    const savelist = (data) => {
        setallfix((old) => [
            ...old, data
        ])


    }
    // const nftinfo2 = async (id) => {
    console.log('alldata', allfixed)



    // useEffect(() => {
    //     // console.log('5')
    //     // console.log('lls',localStorage.getItem(`buylist1`))
    //     newlist.map((val, i) => {
    //         const pist = JSON.parse(localStorage.getItem(`buylist${val}`))
    //         // console.log('ppp',pist)
    //         setmainlist((old) => {
    //             return [...old, pist===mainlist?null:pist]
    //         })

    //     })
    // }, [arr])

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
                    // console.log('aaaprice',length);
                    // setlist(length[1])
                    // setlist2(length[1])
                    localStorage.setItem(`normasale${id}`, (length[3]))
                    setpricearr(id)
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
            setallprice(allp)
        }

    }
    console.log('popeice', allp)
    console.log('allpopeice', allprice)
    useEffect(() => {
        // console.log('5')
        // console.log('lls',localStorage.getItem(`buylist1`))
        newlist.map((val, i) => {
            const pist = localStorage.getItem(`normalsale${val}`)
            // console.log('ppp',pist)
            setprice((old) => {
                return [...old, pist]
            })


        })
    }, [arr, pricearr])
    const buyfixednft = async (collectionid, tokenid) => {

        let amount = Number((allp.find(p => p.id === tokenid ? allp : null)).value)
        let ckamout = amount?.length > 21 ? amount / 1000000000000000000000000000000000000 : amount / 1000000000000000000
        console.log(collectionid, tokenid, ckamout)

        if (window.ethereum && ckamout) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            //  console.log(accounts);
            setShow(true)
            settokenid(accounts)
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
                    // localStorage.removeItem(`buylist${tokenid}`)
                    history.push('/mycollection')
                })
                .catch((err) => {
                    setShow(false)
                    settokenid('')
                })

        }
    }
    useEffect(async () => {

        totalcolection()

    }, [])
    const totalcolection = async () => {

        if (window.ethereum) {
            // setshow(true)

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
            // setspin(i)
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
    console.log('aallcoll', alldata)



    return (
        <section className="explore-area exone">
            <div className="container-fuild">
                <div className="row px-3">
                    <div className="col-12">
                        {/* Intro */}
                        {
                            sale==="sale"?null:<div className="intro d-flex justify-content-between align-items-end m-0">
                            <div className="intro-content">
                                <span>Sale</span>
                                <h3 className="mt-3 mb-0">Sale</h3>
                            </div>
                            <div className="intro-btn">
                                <a className="btn content-btn text-left" href="/explore-1">More</a>
                            </div>
                        </div>
                        }
                        
                    </div>
                </div>
                <div className="row items px-3 ">
                    {sale==="sale"?
                    allfixed?.map((val, idx) => {
                        return (
                            <>
                                {
                                    
                                    dogid.find(p => p === val[0]) ? null :
                                        <div key={`cd_${idx}`} className="col-12 col-sm-6 mcard col-lg-3 item" style={{ position: 'relative' }}>
                                            <div className="card no-hover text-center">
                          
                                                <div className="image-over sale" >
                                                    <Link to={{
                                                        pathname: "/item-details",
                                                        state: val
                                                    }} >
                                                        <img className="card-img-top" style={{ width: '100%' }} src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
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
                                                <div className="card-caption col-12 p-0 ">
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
                                                    <div className="card-body " style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Link to={{
                                                            pathname: "/item-details",
                                                            state: val
                                                        }}>
                                                            <h5 className="mb-0" style={{ textTransform: 'capitalize', fontSize: '15px' }}>{val ? val[1] : null}</h5>
                                                        </Link>
                                                        <div className="seller  my-0" style={{
                                                            display: 'flex', justifyContent: 'space-between'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <span>Owned By</span>
                                                                <Link to={{
                                                                    pathname: "/item-details",
                                                                    state: val
                                                                }}>
                                                                    <h6 style={{textTransform:'capitalize'}} className="ml-2 no-hover mb-0">{val ? val[3] : null}</h6>
                                                                </Link>
                                                            </div>


                                                        </div>

                                                        <div className="card-bottom " style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}} >
                                                            {
                                                                allp?.map((p, dx) => {
                                                                    if (p.id === val[0]) {
                                                                        return <span>{Number(p.value)?.length > 21 ? Number(p.value) / 1000000000000000000000000000000000000 : Number(p.value) / 1000000000000000000} BNB</span>

                                                                    }

                                                                })
                                                            }
                                                            {/* <span>{item.count}</span> */}
                                                            {
                                                    alldata?.map((vv) => {
                                                        if (vv[0] === val[7]) {
                                                            return <Link to={{
                                                                pathname: "/col-details",
                                                                state: vv
                                                            }} className="seller px-0">
                                                                <img className="avatar-sm rounded-circle"  src={`https://ipfs.infura.io/ipfs/${vv ? vv[6] : null}`} alt="" />

                                                                {/* <span className="ml-2">{val ? val[5] : null}</span> */}
                                                            </Link>
                                                        }
                                                    })
                                                }

                                                        </div>
                                                        <button style={{border:'2px solid #99B7FF'}} className="btn btn-bordered-white btn-smaller mt-0" onClick={() => buyfixednft(val[7], val[0])}><i className="icon-handbag mr-2" />Buy</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                }
                            </>
                        );
                    }): allfixed?.slice(0,8).map((val, idx) => {
                        return (
                            <>
                                {
                                    
                                    dogid.find(p => p === val[0]) ? null :
                                        <div key={`cd_${idx}`} className="col-12 col-sm-6 mcard col-lg-3 item" style={{ position: 'relative' }}>
                                            <div className="card no-hover text-center">
                          
                                                <div className="image-over sale" >
                                                    <Link to={{
                                                        pathname: "/item-details",
                                                        state: val
                                                    }} >
                                                        <img className="card-img-top" style={{ width: '100%' }} src={`https://ipfs.infura.io/ipfs/${val ? val[6] : null}`} alt="" />
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
                                                <div className="card-caption col-12 p-0 ">
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
                                                    <div className="card-body " style={{ height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                        <Link to={{
                                                            pathname: "/item-details",
                                                            state: val
                                                        }}>
                                                            <h5 className="mb-0" style={{ textTransform: 'capitalize', fontSize: '15px' }}>{val ? val[1] : null}</h5>
                                                        </Link>
                                                        <div className="seller  my-0" style={{
                                                            display: 'flex', justifyContent: 'space-between'
                                                        }}>
                                                            <div style={{
                                                                display: 'flex', alignItems: 'center'
                                                            }}>
                                                                <span>Owned By</span>
                                                                <Link to={{
                                                                    pathname: "/item-details",
                                                                    state: val
                                                                }}>
                                                                    <h6 style={{textTransform:'capitalize'}} className="ml-2 no-hover mb-0">{val ? val[3] : null}</h6>
                                                                </Link>
                                                            </div>


                                                        </div>

                                                        <div className="card-bottom " style={{display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center'}} >
                                                            {
                                                                allp?.map((p, dx) => {
                                                                    if (p.id === val[0]) {
                                                                        return <span>{Number(p.value)?.length > 21 ? Number(p.value) / 1000000000000000000000000000000000000 : Number(p.value) / 1000000000000000000} BNB</span>

                                                                    }

                                                                })
                                                            }
                                                            {/* <span>{item.count}</span> */}
                                                            {
                                                    alldata?.map((vv) => {
                                                        if (vv[0] === val[7]) {
                                                            return <Link to={{
                                                                pathname: "/col-details",
                                                                state: vv
                                                            }} className="seller px-0">
                                                                <img className="avatar-sm rounded-circle"  src={`https://ipfs.infura.io/ipfs/${vv ? vv[6] : null}`} alt="" />

                                                                {/* <span className="ml-2">{val ? val[5] : null}</span> */}
                                                            </Link>
                                                        }
                                                    })
                                                }

                                                        </div>
                                                        <button style={{border:'2px solid #99B7FF'}} className="btn btn-bordered-white btn-smaller mt-0" onClick={() => buyfixednft(val[7], val[0])}><i className="icon-handbag mr-2" />Buy</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                }
                            </>
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
                        

                            <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-evenly' }}><Spinner animation="grow" variant="light" />
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

export default ExploreOne;